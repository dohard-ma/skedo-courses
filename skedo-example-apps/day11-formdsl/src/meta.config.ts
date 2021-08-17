type FooContext = {
  user : {
    state : string
  }
}
export default {
  form: {
    type : "form",
    items: [{
      type : 'input',
      path : ['user', 'name'],
      default : "hello"
    }, {
      type : "condition",
      cond : (ctx : FooContext) => {
        return ctx.user.state === 'loggedin' ? 
          0 : 1
      },
      items : [{
        type : 'input',
        path : ['lang', 'ts'],
      }, {
        type : 'input',
        puath : ['lang', 'node']
      }]
    }],
  },
}

// 最小知识原则