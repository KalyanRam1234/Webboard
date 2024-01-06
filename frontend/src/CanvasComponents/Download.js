import {jsPDF} from 'jspdf';
import axios from 'axios'
import mergeImages from "merge-images"
export const download = async (Refs,TempRefs, pages,Export,baseURL, name, setPdf , setFetchLoading) => {
    var heightnew=(Math.round(Refs[0].current.width-300)/Math.round(Refs[0].current.width))*Math.round(Refs[0].current.height);
    // var doc= new jsPDF('1', 'pt', [Math.round(Refs[0].current.width -300),heightnew],true);
    var doc=new jsPDF({
        orientation: '1',
        unit: "pt",
        format: [Math.round(Refs[0].current.width -300),heightnew],
        compress: true
    })
    //need to get this done in backend
    // var heightnew=Math.round((800/Refs[0].current.width)*Refs[0].current.height);
    // var doc= new jsPDF('l', 'pt', [Math.round(800),heightnew], true);
    // for(let i=0;i<Refs.length;i++){
    //     var image = Refs[i].current.toDataURL('image/png', 1.0);
    //     var pic=new Image();
    //     pic.src=image;
    //     pic.onload=()=>{{pdfctx.current.drawImage(pic,0,0, 800, heightnew )
    //         const imagenew=pdfRef.current.toDataURL('image/png',1.0);
    //         console.log(imagenew);
    //         doc.addImage(imagenew,'PNG',0,0, 800, heightnew, "", 'FAST',0);
    //         doc.addPage();
    //         if(i==Refs.length-1){ 
    //             console.log("hi");
    //             doc.save(name);
    //         }
    //        }}
    // }
//    var canvas=new fabric.Canvas('0');
//    var pic=new Image();
//     var image = Refs[0].current.toDataURL({
//         format: 'jpeg',
//         quality: 0.9
//     });
//    console.log(image);
//    pic.src=image;
//    pic.onload=()=>{
//     var fabricImage=new fabric.Image(pic, {
//         width: 800, height: heightnew, angle: 0, opacity: 1
//     })
//     canvas.add(fabricImage);
//     var imgData= canvas.toDataURL({
//         format: 'jpeg',
//         quality: 0.2
//     })
//     doc.addImage(imgData,'JPEG',0,0, 800, heightnew, undefined, 'FAST');
//     doc.addPage();
//     doc.save(name);
//    }
//need to fix ordering of pages when using add page
let array=[];
    for(let i=0;i<pages.length;i++){
        let p;
        for(let j=0;j<pages.length;j++){
            if(pages[j]==i){
                p=j;
                break;
            }
        }
        var image = Refs[p].current.toDataURL({
            format: 'image/png',
            quality: 1
        });
       await mergeImages([image,TempRefs[p].current.toDataURL('image/png')]).then((e)=>{
           array.push(e)
        })
    }
    for(var i=0;i<pages.length;i++){
        doc.addImage(array[i],'PNG',0,0, Math.round(Refs[0].current.width -300), heightnew, undefined, 'FAST');
        if(i!=Refs.length-1) doc.addPage();
    }
    if(!Export){
        doc.save(name+".pdf");
        //  setLoading(false);
    }
    else{
        let blob = doc.output('blob');
        let formData= new FormData();
        formData.append('file', blob, name+".pdf");
        // formData.append('file', blob, name);
        const config= {
            headers: {'Content-Type': `multipart/form-data;boundary=${formData._boundary}`}
        }

        await axios.post(baseURL+'/api/addPdf', formData, config).then(response=>{
            setPdf(name);
            setFetchLoading.current=false;
            // setLoading(false);
        })
        .catch(error=>{
            console.log(error);
            // setLoading(false);
        })
    }
  }

