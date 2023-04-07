import Sequelize from 'sequelize';
import Bcrypt from 'bcryptjs';
import Passport from 'passport';
import multer from 'multer';
import path from 'node:path';

export class UserProfileController {

    app;
    userModel;
    passport;
    upload;
    fileName;

    /**
     * @param {import('express-serve-static-core').Express} app
     * @param {Sequelize.ModelStatic<Sequelize.Model<any, any>>} userModel
     * @param {Passport.PassportStatic} passport
     */
    constructor(app, userModel, passport) {
        this.app = app;
        this.userModel = userModel;
        this.passport = passport;

        // Multer configuration
        const storage = multer.diskStorage({
            destination: path.join('./image'),
            filename: (req, file, cb) => {
                this.imageName = Date.now() + path.extname(file.originalname);
                cb(null, this.imageName);
            },
        });
        this.upload = multer({ storage: storage }).single('avatar');
    }

    /**
     * Handles server routes
     */
    handleRoutes() {
        // Register user
        this.app.put('/users/register', async (req, res) => {
            const user = await this.userModel.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user === null) {
                const hashedPassword = await Bcrypt.hash(req.body.password, 10);
                await this.userModel.create({
                    email: req.body.email,
                    password: hashedPassword,
                    name: req.body.name,
                    surname: req.body.surname
                });
                return res.status(201).send({ messsage: 'User registered' });
            } else {
                return res.status(409).send({ message: 'User already exists' });
            }
        });

        // Login user
        this.app.post('/users/login', (req, res, next) => {
            this.passport.authenticate('local', (err, user, _info) => {
                if (err) return res.status(500).send({ message: err });
                if (!user) return res.status(404).send({ message: 'User with given credentials not found' });
                else {
                    req.logIn(user, (err) => {
                        if (err) return res.status(500).send({ message: 'Error occurred' });
                        return res.status(200).send({ message: 'User logged in' });
                    });
                }
            })(req, res, next);
        });

        // Logout user
        this.app.post('/users/logout', (req, res) => {
            req.logOut((err) => {
                if (err) throw err;
                return res.send('User logged out');;
            });
        });

        // Edit user data
        this.app.post('/users/profile/edit', (req, res) => {
            this.upload(req, res, async (err) => {
                if (err) {
                    console.error(err);
                } else {
                    const user = await this.userModel.findOne({
                        where: {
                            // @ts-ignore
                            id: req.user.id
                        },
                    });

                    // @ts-ignore
                    if (req.body.name) user.name = req.body.name;
                    // @ts-ignore
                    if (req.body.surname) user.surname = req.body.surname;
                    // @ts-ignore
                    if (req.body.password) user.password = req.body.password;
                    // @ts-ignore
                    if (req.file) user.avatar = this.imageName;

                    await user.save();

                    return res.status(200).send({ 'message': 'User profile updated' });
                }
            });
        });

        // Get user data
        this.app.get('/users/profile', (req, res) => {
            return res.send(req.user);
        });
    }
}