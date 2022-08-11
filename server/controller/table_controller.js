let db = [ ...require('../db') ];

const serverToken = "token"; //представим, что он как-либо генерируется
const userLogin = 'User';
const userPassword = '123';

//функция проверки токена
const checkToken = (headers) => {
    const token = headers[headers.indexOf('authorization') + 1]
    return serverToken == token
}

//список кейсов запросов
class TableController{
  //CRUD

  //создание строки
  createRow(req, res){
      if(!checkToken(req.rawHeaders)) {
        res.status(401);
        res.json({
          message: "Unauthorized",
          error: new Error()
        });
        return;
      }

      const {name, phone} = req.body
      const newRow = {
          //можно было бы использовать uuid v4, но это лишний замороч, для тестов достаточно рандома
          id: String(Math.round(Math.random() * 100000)),
          name: name,
          phone: phone,
       }

      db.push(newRow);
      res.json(newRow)
  }

  //получение таблицы
  getTable(req, res){
      if(!checkToken(req.rawHeaders)) {
        res.status(401);
        res.json({
          message: "Unauthorized",
          error: new Error()
        });
        return;
      }

      const page = req.query.page;
      const packageSize = req.query.packageSize;

      const part = db.filter( (item, index) => index >= (page - 1) * packageSize && index < page * packageSize);

      res.json(part)
  }

  //получение одной строки (не задействована)
  getRow(req,res){
      const id = req.params.id
      const [row] = db.filter(item => item.id == id)

      res.json(row)
  }

  //обновление строки (не задействована)
  updateRow(req,res){
      const { id, name, phone } = req.body
      const newItem = {id: id, name: name, phone: phone}

      db = db.map( item => item.id == id ? newItem : item);

      res.json(newItem)
  }

  //удаление строки
  deleteRow(req,res){
      if(!checkToken(req.rawHeaders)) {
        res.status(401);
        res.json({
          message: "Unauthorized",
          error: new Error()
        });
        return;
      }

      const id = req.query.id
      let deletedRow = false;

      db = db.filter(item => {
        if(item.id !== id) {
          return true;
        } else {
          deletedRow = item;
          return false;
        }
      })

      res.json(deletedRow)
  }

  //логин
  login(req,res){
      const { login, password } = req.body
      const access = login == userLogin && password == userPassword;

      res.json(checkToken(req.rawHeaders) || access ? serverToken : null)
  }

}

module.exports = new TableController()
