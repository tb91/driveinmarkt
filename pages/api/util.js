import crypto from "crypto";

export const validateUser = user => {
  if (!user) {
    return false;
  }
  if (!user.email || !user.password) {
    return false;
  }
  return true;
};

export function computeHash(password, salt, fn) {
  // Bytesize
  const len = 32;
  const iterations = 4096;
  if (3 == arguments.length) {
    crypto.pbkdf2(password, salt, iterations, len, "sha512", function(
      err,
      derivedKey
    ) {
      if (err) return fn(err);
      fn(null, salt, derivedKey.toString("base64"));
    });
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt) {
      if (err) return fn(err);
      salt = salt.toString("base64");
      crypto.pbkdf2(password, salt, iterations, len, "sha512", function(
        err,
        derivedKey
      ) {
        if (err) return fn(err);
        fn(null, salt, derivedKey.toString("base64"));
      });
    });
  }
}
