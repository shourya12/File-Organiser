let fs=require("fs");
let path=require("path");
const { json } = require("stream/consumers");

let inputArr = process.argv.slice(2);

let option=inputArr[0];

let types={
    Images:['jpeg','png','jpg'],
    ReadFile:['txt'],
    Audio:['mp3'],
    Video:['mp4','mkv'],
    archives :['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents :['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg','deb']
};

switch(option)
{
    case 'tree':
        treeFn(inputArr[1]);
        break;
    case 'organize':
        organizeFn(inputArr[1]);
        break;
    case 'help':
        helpFn();
        break;
    default :
        console.log("Please🙏 enter valid commend");
        break;


}

function helpFn()
{
    console.log(
    `List of all commands:
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help`);
}

function treeFn(dirpath)
{

}

function organizeFn(dirpath)
{
    if(!fs.existsSync(dirpath))
    {
        console.log("Given Directory is not present Please 🙏 enter correct directory path");
        return ;
    }
    else
    {
        let destPath = path.join(dirpath,"organize_file");
        if(!fs.existsSync(destPath))
        {
            fs.mkdirSync(destPath);
        }

        let childName= fs.readdirSync(dirpath);
        console.log(childName);

        for(let i=0;i<childName.length;i++)
        {
            let filePath=path.join(dirpath,childName[i]);
            let isFiles=fs.lstatSync(filePath).isFile();
            if(isFiles)
            {
                let category=getCategory(childName[i]);
                console.log(childName[i]+"---->"+category);
                sourceCopyFile(filePath,destPath,category);
            }
        }
        
    }
}

function getCategory(name)
{
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types)
    {  
       
        let ctype= types[type];
        for(let j=0;j<ctype.length;j++)
        {
            if(ctype[j]==ext)
            { 
                console.log(ctype[j]);
                return type;
            }
        }
    }

    return "others";
}

function sourceCopyFile(srcFile,dest,cat)
{
    let destPath =path.join(dest,cat);
    
    if(!fs.existsSync(destPath))
    {
        fs.mkdirSync(destPath);
    }
    let childBase=path.basename(srcFile);
    let childFile=path.join(destPath,childBase);
    fs.copyFileSync(srcFile,childFile);

  


}