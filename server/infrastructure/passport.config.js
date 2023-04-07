import { Strategy as LocalStrategy } from 'passport-local';
import Passport from 'passport';
import Sequelize from 'sequelize';
import Bcrypt from 'bcryptjs';

export class PassportConfig {

    invalidUserDataMessage = 'Incorrect email or password.';
    app;
    userModel;
    passport;

    /**
     * @param {import('express-serve-static-core').Express} app
     * @param {Sequelize.ModelStatic<Sequelize.Model<any, any>>} userModel
     */
    constructor(app, userModel) {
        this.app = app;
        this.userModel = userModel;
        this.passport = Passport;
    }

    /**
     * Configures passport library
     */
    configure() {
        this.app.use(this.passport.initialize());
        this.app.use(this.passport.session());

        this.passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            const user = await this.userModel.findOne({
                where: {
                    email: email,
                }
            });

            if (!user) {
                return done(null, false, { message: this.invalidUserDataMessage });
            }

            // @ts-ignore
            Bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    throw err;
                }
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: this.invalidUserDataMessage });
                }
            });
        }));

        this.passport.serializeUser((user, done) => {
            // @ts-ignore
            done(null, user.id);
        });

        this.passport.deserializeUser(async (id, done) => {
            const user = await this.userModel.findOne({
                where: {
                    id: id,
                }
            });
            done(null, user);
        });
    }
}