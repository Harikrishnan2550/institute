// import jwt from "jsonwebtoken";

// // ✅ Verify JWT Token
// export const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader?.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ message: "Access denied. No token provided." });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       id: decoded.id || null,
//       email: decoded.email || null,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     console.error("❌ Token verification failed:", error.message);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // ✅ Role-based Access Middleware
// export const verifyRole = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: "Access denied: insufficient privileges" });
//     }
//     next();
//   };
// };



// import jwt from "jsonwebtoken";

// // ✅ Verify JWT Token
// export const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader?.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ message: "Access denied. No token provided." });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       id: decoded.id || null,
//       email: decoded.email || null,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     console.error("❌ Token verification failed:", error.message);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // ✅ Role-based Access Middleware
// export const verifyRole = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: "Access denied: insufficient privileges" });
//     }
//     next();
//   };
// };



import jwt from "jsonwebtoken";

// ✅ Verify JWT Token
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Include agentId if available
    req.user = {
      id: decoded.id || null,
      email: decoded.email || null,
      role: decoded.role,
      agentId: decoded.agentId || null, // 👈 Important line added
    };

    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Role-based Access Middleware
export const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient privileges" });
    }
    next();
  };
};
