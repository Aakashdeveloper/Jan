var fs = require('fs');

// Write and overwrite
/*fs.writeFile('test1.txt','Hi form nodeJs second',function(err){
    if(err) throw err;
    console.log('File Created')
})*/

// Write and append
/*fs.appendFile('test1.txt','Hi form Node third>>> \n',function(err){
    if(err) throw err;
    console.log('File Created')
})

fs.readFile('test1.txt','utf-8', function(err, data){
    if(err) throw err;
    console.log(data)
})

fs.appendFile('test2.txt','Hi form Node third>>> \n',function(err){
    if(err) throw err;
    fs.readFile('test2.txt','utf-8', function(err, data){
        if(err) throw err;
        console.log(data)
    })
});


fs.rename('test1.txt', 'mytest.txt',function(err){
    if(err) throw err;
    console.log("file renamed")
});


fs.unlink('mytest.txt',function(err){
    if(err) throw err;
    console.log("file deleted")
})
*/

fs.readFile('db.json','utf-8', function(err, data){
    if(err) throw err;
    console.log(data)
})


