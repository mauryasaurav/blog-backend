import mongoose from 'mongoose';
var Schema = mongoose.Schema;


const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password_confirmation: {
    type: String,
    required: true
    }
});

var UserSchema = new Schema({
        email: {
            type: String, required: true,
            trim: true, unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
    });

    UserSchema.set('toJSON', {getters: true, virtuals: true});

    UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'facebookProvider.id': profile.id
        }, function(err: any, user: any) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error: any, savedUser: any) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        console.log("profile========+>", profile)
        var that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err: any, user: any) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken,
                        fullName: profile.displayName,
                        image: profile.picture
                    }
                });

                newUser.save(function(error: any, savedUser: any) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };
    
export const socialRegister =  mongoose.model('User', UserSchema);

export const register = mongoose.model("register", registerSchema)
