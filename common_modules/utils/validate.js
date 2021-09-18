let lang = {
  zh: {
    name: '只能是汉字、字母、数字、下划线',
    code: '只能是字母、数字、下划线',
    trim: '两边不能有空格',
    phone: '联系方式格式不正确',
    telphone: '办公电话格式不正确(010-8888888)',
    identity_format_error: '身份证号格式错误',
    identity_code_error: '地址编码错误',
    identity_check_error: '校验位错误',
    Email: '邮箱格式不正确',
    number_unique_zero: '输入数字不能为零',
    number_first_zero: '请输入首位不为零的数字'
  },
  en: {
    name: '只能是汉字、字母、数字、下划线',
    code: '只能是字母、数字、下划线',
    trim: '两边不能有空格',
    phone: '联系方式格式不正确',
    telphone: '办公电话格式不正确(010-8888888)',
    identity_format_error: '身份证号格式错误',
    identity_code_error: '地址编码错误',
    identity_check_error: '校验位错误',
    Email: '邮箱格式不正确',
    number_unique_zero: '输入数字不能为零',
    number_first_zero: '请输入首位不为零的数字'
  },
  ug: {
    name: '只能是汉字、字母、数字、下划线',
    code: '只能是字母、数字、下划线',
    trim: '两边不能有空格',
    phone: '联系方式格式不正确',
    telphone: '办公电话格式不正确(010-8888888)',
    identity_format_error: '身份证号格式错误',
    identity_code_error: '地址编码错误',
    identity_check_error: '校验位错误',
    Email: '邮箱格式不正确',
    number_unique_zero: '输入数字不能为零',
    number_first_zero: '请输入首位不为零的数字'
  }
}[`${G.lang}`];

var Validate = {
  /* 用户名验证 */
  name: function(rule, value, callback) {
    if (!/^(\w|[\u4e00-\u9fa5])+$/.test(value)) {
      callback(new Error(lang.name));
    } else {
      callback();
    }
  },
  code: function(rule, value, callback) {
    if (!/^\w+$/.test(value)) {
      callback(new Error(lang.code));
    } else {
      callback();
    }
  },
  /* 两边不能有空格 */
  trim: function(rule, value, callback) {
    if (!value || value.trim() === value) {
      callback();
    } else {
      callback(new Error(lang.trim));
    }
  },
  /* 手机号码验证 */
  phone: function(rule, value, callback) {
    if (!value || /^1[3456789]\d{9}$/.test(value)) {
      callback();
    } else {
      callback(new Error(lang.phone));
    }
  },
  /* 联系方式验证 */
  telephone: function(rule, value, callback) {
    if (!value || /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
      callback();
    } else {
      callback(new Error(lang.telphone));
    }
  },
  /* 身份证验证 */
  identity: (rule, value, callback) => {
    var personId = value;

    if (!rule.required && !value) {
      return callback();
    }

    setTimeout(() => {
      var message = IdentityCodeValid(personId);
      if (!message.pass) {
        callback(new Error('' + message.tip));
      } else {
        callback();
      }
    }, 1000);
  },
  /* 邮箱验证 */
  Email: (rule, value, callback) => {
    if (
      !value ||
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        value
      )
    ) {
      callback();
    } else {
      callback(new Error(lang.Email));
    }
  },
  /*  数字不能为零 且首位不为零的数字 */
  noZeroNum: (rule, value, callback) => {
    if (value && /^[0-9]\d*$/.test(value)) {
      if (value.length > 1 && !/^[1-9]\d*$/.test(value)) {
        callback(new Error(lang.number_first_zero));
      } else if (value.length === 1 && (value === 0 || value === '0')) {
        callback(new Error(lang.number_unique_zero));
      } else {
        callback();
      }
    } else {
      callback('请输入非零正整数');
    }
  },
  /* 浮点数 */
  pointNum: (rule, value, callback) => {
    if (!/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(value)) {
      callback('');
    } else {
      callback();
    }
  }
};

/** 验证规则 **/
function IdentityCodeValid(code) {
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  var tip = '',
    pass = true;
  if (!code || !/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(code)) {
    tip = lang.identity_format_error;
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = lang.identity_code_error;
    pass = false;
    // 18位身份证需要验证最后一位校验位
  } else if (code.length === 18) {
    code = code.split('');
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
      ai = code[i];
      wi = factor[i];
      sum += ai * wi;
    }
    var last = parity[sum % 11];
    if (parity[sum % 11] != code[17]) {
      tip = lang.identity_check_error;
      pass = false;
    }
  }
  return { tip, pass };
}

export { Validate };
