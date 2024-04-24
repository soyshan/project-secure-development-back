// import dotenv from 'dotenv';
// dotenv.config();

// export  const authRequired2 = (req, res, next) =>{

//     const token = req.cookies
//     if (!token) return res.status (401).json({message:"No hay token, acceso denegado"});

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return res.status(401).json({message:"Token inválido"});
//       req.user = user;
//       next();
//     });


  
// }