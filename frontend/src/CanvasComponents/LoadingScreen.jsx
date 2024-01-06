import Loading from 'react-fullscreen-loading'

export default function LoadingScreen() {
  return (
    <div style={{"textAlign":"center","paddingTop":"5vh","color":"#4F37B1"}}>
      <h1>Please wait while we fetch your files. This might take a while.</h1>
      <div style={{"transform": "translateY(40vh)"}}>
        <div style={{"transform": "scale(6.5,6.5)"}}>
          
          <Loading loading background="#fff" loaderColor="#C45DE9"/>
        </div>
      </div>
    </div>
  );
}

