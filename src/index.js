const mongosh=require('mongoose');
const validator=require('validator');

// 1st connection create & *** it always  return promice

// (mongodb://127.0.0.1:27017/colleg)  ->here colege is new db which is creat if no present
mongosh.connect('mongodb://127.0.0.1:27017/colleg',{
    // local host casa last two not support (deprecated) nodejs 4.0 after version not use
 
// useNewUrlParser: true,
    // useUnifiedTopology: true
     // useCreateIndex: true,
    // useFindAndModify: true,
}).then(()=>{
    console.log('sucess')
}).catch(e=>{
    console.log(e);
    
})

// schema create holo ak use hoba collection under value add korta
let loginSchema=new mongosh.Schema({
    name:{
        type:String,
     },
    email:{
        type:String,
        uppercase:true,
        unique:true,
        
     },
    
    bio: {
         type: String,
          
         },
    password:{
        typt:String,
     },
    id:{
        type:Number,
validate(value){
    if(value<0){
        throw new Error('not possible')
    }
}

    }
})
// schema use in collection
// 1. createcollection/model -> 2 arg (i)collcetin name ,(ii)schemanam

let studenColection=new mongosh.model('studenColection',loginSchema);


// ******************  for insert element in model    ******************************
 
// for insert element in model 

// 1 process without async awit
// let st1=new studenColection({
//     name:'kamal',
//     email:'b@gmail.com',
//     k:0,
//     bio:  'oowe',
//   })
//   st1.save();


// 2. process async awit using many await

// let s=async()=>{
// try{
//     // try under same as with out async awit
// let st1=new studenColection({
//     name:'kamal',
//     email:'b@gmail.com',
//     k:0,
//     bio:  'oowe',
//   })
//   let st2=new studenColection({
//     name:'shanku',
//     email:'b@gmail.com',
//      bio:  'oowe',
//   })
// // joto model sab try under 
// //**  1 ta aysnc under many await possible 
//  ********* singel single casa save method must insertMany casa save chalanor darkar nai

//   let result1= await st1.save();
//   let result2= await st2.save();

//  }
// catch(e){
// console.log(e);
// }
// }


// 3. process async awit only 1 line

let s=async()=>{
    try{
        // try under same as with out async awit
    let st1=new studenColection({
        name:'kamal',
        email:'b@gmail.com',
        k:0,
        bio:  'oowe',
      })
      let st2=new studenColection({
        name:'shanku',
        email:'a@gmail.com',
         bio:  'oowe',
         id:4
      })
    // joto model sab try under 
    // collection name .insertMany([array under sab schema])
    //  ************* a casa save method chala nor  darkar nai
     let result= await studenColection.insertMany([st1,st2]);

     }
    catch(e){
    console.log(e);
    }
    finally{
        mongosh.connection.close();
    }
    }

//  must wrap or async fun ka call korta hoba
s()




// ****************** for display ******************************
// 1st process same try under promice return holo
// const  findData=async()=>{
//     try{
//         // await use korla await promic return kora ta result a store hoi
//     let result=await studenColection.find({email:"b@gmail.com"});
//     // a casa result a promice return holo 
//     console.log(result)
//     }
//     catch(e){
//         console.log(e)
//     }
    
// }
// // must function call
// findData()


// 2snd process same try under promice return korbo na funcall a promice retuen hoba
const  findData=async()=>{
  try{
        // await promice return korlo 
return await studenColection.deleteOne({});
     }
    catch(e){
        console.log(e)
    }
    
}
// must function call a casa funcall() return kora promice taka .the,.catch throw axcess promice thaka 
findData().then(data=>{
    console.log(data);
})
.catch((e)=>{
    console.log(e)
})


// ***************** for use in another file src/index.js ***************************

// const connectionDB=async ()=>{
// try{
    // return na likla o return e hoi
//  return   await mongosh.connect('mongodb://127.0.0.1:27017/colleg');
 // }
// catch(e){
// console.log(e);
// process.exit(0);
// }
// finally{
//     mongosh.connection.close();
// }
// }


// module.exports=connectionDB;




//  ********* extra for learning  out of topic above************
// connectionDB() return kora promice hendel hoba .then(),.catch() koar
// connectionDB().then(res=>clg(res)).catch(e){clg(e)}
