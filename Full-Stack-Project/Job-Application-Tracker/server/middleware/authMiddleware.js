import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({

                success: false,
                message: "No token provided"

            });

        }

        const actualToken = token.split(" ")[1];

        const decoded = jwt.verify(

            actualToken,

            process.env.JWT_SECRET

        );

        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,
            message: "Invalid Token"

        });

    }

};