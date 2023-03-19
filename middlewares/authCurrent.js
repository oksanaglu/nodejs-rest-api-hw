
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { RequestError } = require("../utils");

const { SECRET_KEY } = process.env;

const authCurrent = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authCurrent;



/*
Извлекает токен из заголовка и:
1. Проверяет валидность токена (что мы его выдали и он не истек).
2. Извлекает из токена id, находит пользователя в базе по id и прикрепляет его к запросу (req.user).

3. Извлечь из заголовка запроса сщдержимое заголовка authorization.
4. Разделить его на два слва: bearer и токен.
5. Проверить равно ли первое слово "Вearer".
6. Прверить валидность второго слова (токен).
7. Если токен валиден - извлечь из него id и найти пользователя в базе с таким id.
8. Если пользователя с таким id мы нашли в базе - его нужно прикрепить к запросу (обьект req).
*/