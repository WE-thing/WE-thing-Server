const { v4 } = require("uuid"); // uuid4 사용

// uuid 생성
const createUUID = () => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

module.exports = { createUUID };
