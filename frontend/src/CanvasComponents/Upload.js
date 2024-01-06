import {Buffer} from 'buffer'
export const Import = (files,Refs,TempRefs,setImported,images, redoimages,setFetchLoading,CurrHeight=0, setNextHeight=0) =>{
    // usedimport.current=2;
    for(let i=1;i<=Refs.length;i++){
        files.getPage(i).then(function(page) {
            images[i-1]=[];
            redoimages[i-1]=[];
            var pdf_original_width = page.getViewport(1).width;
            var scale_required = Refs[i-1].current.width / pdf_original_width;
            var viewport = page.getViewport(scale_required);
            var render_context= {
                canvasContext : TempRefs[i-1].current,
                viewport : viewport
            }
            page.render(render_context);   
        })
    } 
    // setFetchLoading(false)
    setImported(true);
}
export const pdfChange = (pdf,Refs,setPageCount,setpages,setfiles,setNextHeight,setHeight) => {
    pdf.onchange=function(event){
        var file=event.target.files[0];
        var filereader=new FileReader();
        filereader.onload= function(){
            var typedarray= new Uint8Array(this.result);
            const pdfjsLib=window.pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc=window.pdfjsWorker;
            const task=pdfjsLib.getDocument(typedarray);
            task.promise.then((PDF_DOC)=> {
                var arr=[];
                for(var i=0;i<PDF_DOC.numPages;i++) arr.push(i);
                setpages(arr);
                setfiles(PDF_DOC);
                setPageCount(PDF_DOC.numPages-1);
                PDF_DOC.getPage(1).then(function(page){
                    var pdf_original_width = page.getViewport(1).width;
                    // console.log(pdf_original_width)
                    var scale_required = Refs[0].current.width / pdf_original_width;
                    var viewport = page.getViewport(scale_required);
                    setHeight(viewport.height);
                    setNextHeight(viewport.height);
                })
            })
        }
        filereader.readAsArrayBuffer(file);
    }
}

export const reloadpdf=(buffer, Refs, setPageCount,setpages,setfiles,setNextHeight,setHeight) => {
    if(buffer!=null && buffer!=undefined){
        const arrayBuffer= new Buffer.alloc(buffer.length);
        const typedarray= new Uint8Array(arrayBuffer);
        for (let i=0;i<buffer.length;++i){
            typedarray[i]=buffer[i];
        }
        // var typedarray= new Uint8Array(buffer);
        const pdfjsLib=window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc=window.pdfjsWorker;
        const task=pdfjsLib.getDocument(typedarray);
        task.promise.then((PDF_DOC)=> {
            var arr=[];
            for(var i=0;i<PDF_DOC.numPages;i++) arr.push(i);
            setpages(arr);
            setfiles(PDF_DOC);
            setPageCount(PDF_DOC.numPages-1);
            PDF_DOC.getPage(1).then(function(page){
                var pdf_original_width = page.getViewport(1).width;
                var scale_required = Refs[0].current.width / pdf_original_width;
                var viewport = page.getViewport(scale_required);
                setHeight(viewport.height);
                setNextHeight(viewport.height);
            })
        })
    }
}