// http 요청 방식을 확인합니다
exports.getMethod = ((req, res, next) => {
  let _method = ''
  // put 일 경우
  if(req.headers['method'] == 'PUT') {
    _method = req.headers['method']
    req.method = 'PUT';
  }
  // delete 일 경우
  if(req.query.method == 'DELETE') {
    req.id = req.query.id
    req.method = 'DELETE';
  }
  next();
});