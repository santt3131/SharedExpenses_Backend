//use share
db.createCollections('Users');

db.Users.insertMany([
  { 
    name: 'Santiago', 
    surname: 'Bruno', 
    email: 'santt31@gmail.com', 
    password: 686635586,
    groups: [],
    expenses : []
  },
  { 
    name: 'Ramiro', 
    surname: 'Mejias', 
    email: 'ramiro.mejias@gmail.com', 
    password: 686635589,
    groups: [],
    expenses: []
  },
  { 
    name: 'Maria', 
    surname: 'Pérez', 
    email: 'maria.perez@gmail.com', 
    password: 686635584,
    groups: [],
    expenses: []
  }
]);

db.createCollections('Categories');
db.Categories.insertMany([
  { 
    category: 'Hotel',
    image: 'data:image/png;base64,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' 
  },
  { 
    groupName: 'Transportation',
    image : 'data:image/png;base64,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'
  }
]);

db.createCollections('Groups');

db.Groups.insertMany([
  { 
    groupName: 'Salida a Paris',
    users: [ 
      '62b5e88ba6e78636d6488645', //id Santi
      '62b5e88ba6e78636d6488646', //id Ramiro
      '62b5e88ba6e78636d6488647'  //id Maria
    ],
    groups_types: [
      '62b5e8b7a6e78636d6488648',//Hotel
      '62b5e8b7a6e78636d6488649' //Transportation
    ]
  },
  { 
    groupName: 'Salida a Berlin',
    users: [ 
      '62b5e88ba6e78636d6488645', //id Santi
      '62b5e88ba6e78636d6488646', //id Ramiro
    ],
    groups_types: [
      '62b5e8b7a6e78636d6488648',//Hotel
      '62b5e8b7a6e78636d6488649' //Transportation
    ]
  }
]);



//NOTA!: Los expenses deberian tener fecha inicio y final
db.createCollections('Expenses');
db.Expenses.insertMany([
  { 
    title: 'Hotel Mansion - Dia 1',
    startdate: '15/06/2022',
    enddate: '16/06/2022',
    note: 'Hotel de 5 estrellas por 1 noche',
    expenses_categories: '62b5e8b7a6e78636d6488648', //id de la categoria Hotel
    payments: []
  },
  { 
    title: 'Hotel Royal - Dia 2',
    startdate: '16/06/2022',
    enddate: '17/06/2022',
    note: 'Hotel de 5 estrellas por 1 noche',
    expenses_categories: '62b5e8b7a6e78636d6488648', ////id de la categoria Hotel
    payments: []
  },
  { 
    title: 'Taxis y Buses',
    startdate: '15/06/2022',
    enddate: '17/06/2022',
    note: '',
    expenses_categories: '62b5e8b7a6e78636d6488649', ////id de la categoria Transporte
    payments: []
  }
]);

//UPDATES
//========

//UPDATE USER: "groups" field
  //update Santi user
db.Users.updateOne(
  {
    _id: ObjectId('62b5e88ba6e78636d6488645')
  },
  { $set: 
    { 
    groups: [
      '62b5e8d6a6e78636d648864a',//id Paris
      '62b5e8d6a6e78636d648864b' //id Berlin
    ]
  } 
  }
);

db.Users.updateOne(
  {
    _id: ObjectId('62b5e88ba6e78636d6488646')
  },
  { $set: 
    { 
    groups: [
      '62b5e8d6a6e78636d648864a',//id Paris
      '62b5e8d6a6e78636d648864b' //id Berlin
    ]
  } 
  }
);


db.Users.updateOne(
  {
    _id: ObjectId('62b5e88ba6e78636d6488647')
  },
  { $set: 
    { 
    groups: [
      '62b5e8d6a6e78636d648864b',//id Paris
    ]
  } 
  }
);


//UPDATE EXPENSES: "expenses_categories" field
db.Expenses.updateOne(
  {
    _id: ObjectId('62b5e902a6e78636d648864c')
  },
  { $set: 
    { 
      expenses_categories: [
        '62b5e8b7a6e78636d6488648',//id de la categoria Hotel
      ]
    } 
  }
);

db.Expenses.updateOne(
  {
    _id: ObjectId('62b5e902a6e78636d648864d')
  },
  { $set: 
    { 
      expenses_categories: [
        '62b5e8b7a6e78636d6488648',//id de la categoria Hotel
      ]
    } 
  }
);

db.Expenses.updateOne(
  {
    _id: ObjectId('62b5e902a6e78636d648864e')
  },
  { $set: 
    { 
      expenses_categories: [
        '62b5e8b7a6e78636d6488649',//id de la categoria Transporte
      ]
    } 
  }
);


//UPDATE USER: "expenses" field
  //update Santi
db.Users.updateOne(
  {
    _id: ObjectId('62b5e88ba6e78636d6488645')
  },
  { $set: 
    { 
      expenses : [        //update users_expenses
      { 
        idExpenses: '62b5e902a6e78636d648864c',     //id Hotel Mansion - Dia 1
        payment: '100€',
        debt: '60€',
        paid: '40€'
      },
      { 
        idExpenses: '62b5e902a6e78636d648864d',      //id Hotel Royal - Dia 2
        payment: '100€',
        debt: '60€',
        paid: '40€'
      },
      { 
        idExpenses: '62b5e902a6e78636d648864e',      //id de la categoria Transporte
        payment: '80€',
        debt: '70€',
        paid: '10€'
      }
    ]
    } 
  }
);

//update Ramiro . Suponiendo que debe lo mismo porque la cuenta era 300€ y se dividio en partes iguales.
//Y lo pago una tercera persona . Maria
db.Users.updateOne(
  {
    _id: ObjectId('62b5e88ba6e78636d6488646')
  },
  { $set: 
    { 
      expenses : [        //update users_expenses
      { 
        idExpenses: '62b5e902a6e78636d648864c',     //id Hotel Mansion - Dia 1
        payment: '100€',
        debt: '60€',
        paid: '40€'
      },
      { 
        idExpenses: '62b5e902a6e78636d648864d',      //id Hotel Royal - Dia 2
        payment: '100€',
        debt: '60€',
        paid: '40€'
      },
      { 
        idExpenses: '62b5e902a6e78636d648864e',      //id de la categoria Transporte
        payment: '80€',
        debt: '70€',
        paid: '10€'
      }
    ]
    } 
  }
);

//OBSERVACIÓN
//FALTA: 
//-FORMAS DE PAGO, mitad , por porcentaje. 
//-QUIEN DEBE A QUIEN , me parece que deberia estar en expenses de User.
//Falta definir quien realizo todo el pago de ese expenses

//UPDATE EXPENSES: "payments" field 
  //pagos de Santi
db.Expenses.updateOne(
  {
    _id: ObjectId('62b5e902a6e78636d648864c') //Hotel Royal - Dia 1
  },
  { $set: 
    { 
      payments: [{
        date: '30/06/2022',
        note: 'pago parcial',
        idUsersFrom : '62b5e88ba6e78636d6488645', //id Santi
        idUsersTo: '62b5e88ba6e78636d6488647', //id de Maria
        quantity: '40€'
      }]
    } 
  }
);


db.Expenses.updateOne(
  {
    _id: ObjectId('62b5e902a6e78636d648864d') //Hotel Royal - Dia 2
  },
  { $set: 
    { 
      payments: [{
        date: '30/06/2022',
        note: 'pago parcial',
        idUsersFrom : '62b5e88ba6e78636d6488645',
        idUsersTo: '62b5e88ba6e78636d6488647', //id de Maria
        quantity: '40€'
      }]
    } 
  }
);

db.Expenses.updateOne(
  {
    _id: ObjectId('62b5e902a6e78636d648864e') //Taxis y Buses
  },
  { $set: 
    { 
      payments: [{
        date: '30/06/2022',
        note: 'pago parcial',
        idUsersFrom : '62b5e88ba6e78636d6488645',
        idUsersTo: '62b5e88ba6e78636d6488647', //id de Maria
        quantity: '10€'
      }]
    } 
  }
);

  //pagos de Ramiro

  db.Expenses.updateOne(
    {
      _id: ObjectId('62b5e902a6e78636d648864c') //Hotel Royal - Dia 1
    },
    { $set: 
      { 
        payments: [{
          date: '30/06/2022',
          note: 'pago parcial',
          idUsersFrom : '62b5e88ba6e78636d6488646', //id Ramiro
          idUsersTo: '62b5e88ba6e78636d6488647', //id de Maria
          quantity: '40€'
        }]
      } 
    }
  );
  
  
  db.Expenses.updateOne(
    {
      _id: ObjectId('62b5e902a6e78636d648864d') //Hotel Royal - Dia 2
    },
    { $set: 
      { 
        payments: [{
          date: '30/06/2022',
          note: 'pago parcial',
          idUsersFrom : '62b5e88ba6e78636d6488646',
          idUsersTo: '62b5e88ba6e78636d6488647', //id de Maria
          quantity: '40€'
        }]
      } 
    }
  );
  
  db.Expenses.updateOne(
    {
      _id: ObjectId('62b5e902a6e78636d648864e') //Taxis y Buses
    },
    { $set: 
      { 
        payments: [{
          date: '30/06/2022',
          note: 'pago parcial',
          idUsersFrom : '62b5e88ba6e78636d6488646',
          idUsersTo: '62b5e88ba6e78636d6488647', //id de Maria
          quantity: '10€'
        }]
      } 
    }
  );
