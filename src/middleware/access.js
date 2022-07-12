const access = async (req,res,next) => {
    try { 
    await res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    await res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS GET, POST, PUT, PATCH, DELETE"
    );
    await res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next();
  } catch {
    next();
  }
   
};

module.exports = { access }