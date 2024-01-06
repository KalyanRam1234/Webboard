import swal from 'sweetalert';
export const clear =(canvasRef,ctx,pagenumber, images) =>{
    //  const ctx=canvasRef.current.getContext('2d');
    swal({
        title: "Clearing Page " + pagenumber +" ?",
        text: "Once cleared, you will not be able to recover this page! Only the annotated part will be cleared",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          ctx.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
          swal("Your page has been cleared!", {
            icon: "success",
          });
          images[pagenumber-1]=[canvasRef.current.toDataURL('image/png')];
        }
      });
};