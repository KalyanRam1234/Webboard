import { React, useEffect, useState, useRef } from "react";
import { download } from "./Download";
import { clear } from "./Clear";
import Page from "./Page";
//need to add scale to everything
import { reloadpdf, Import, pdfChange } from "./Upload";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../actions/cartAction";
import LoadingScreen from "./LoadingScreen";
import PolygonLasso from "./lassoTool/Lasso";

const shapes = [
  "pen",
  "circle",
  "rectangle",
  "line",
  "eraser",
  "oval",
  "select",
];
//upload not working for 1 page
function Canvas(props) {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [mouseDown, setMouseDown] = useState(false);
  const [last, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(3);
  const [erasersize, setEraser] = useState(3);
  const [shape, setShape] = useState(shapes[0]);
  const [drawing, setDrawing] = useState(false);
  const [page, setPagecount] = useState(0); //total number of pages
  const [pagenumber, setPagenumber] = useState(1);
  const [canvasRef, setCanvasRef] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [Refs, setRefs] = useState([]);
  const [TempRefs, setTempRefs] = useState([]);
  const [WritingRefs, setWritingRefs] = useState([]);
  const [images, setimages] = useState({ 0: [] });
  const [redoimages, setredo] = useState({ 0: [] });
  const [CurrHeight, setNextHeight] = useState(window.innerHeight);
  const [pages, setpages] = useState([0]);
  const [files, setfiles] = useState(null);
  const [Height, setHeight] = useState(window.innerHeight);
  const usedimport = useRef(1);
  const firstUpdate = useRef(true);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  let pdf;
  const [state, setstate] = useState(0);
  const [Pressed, setPressed] = useState(true);
  const pdfRef = useRef(null);
  const pdfctx = useRef(null);
  const [tool, setTool] = useState(true);
  const [imported, setImported] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isrefresh, setRefresh] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const newloading = useRef(false);
  const [clicked, setClicked] = useState(false);
  const [prevclicked, setprevClicked] = useState(false);
  const first = useRef(false);
  const unload = useRef(true);

  const [pagewidth, setPagewidth] = useState(window.innerWidth);
  // const reduxstate= useSelector((state)=> state);
  const dispatch = useDispatch();
  const undo = () => {
    if (images[pagenumber - 1].length >= 1) {
      console.log(pagenumber - 1);
      const newctx = WritingRefs[pagenumber - 1].current.getContext("2d");
      redoimages[pagenumber - 1].push(images[pagenumber - 1].pop());
      var pic = new Image();
      pic.src = images[pagenumber - 1][images[pagenumber - 1].length - 1];
      newctx.clearRect(
        0,
        0,
        WritingRefs[pagenumber - 1].current.width,
        WritingRefs[pagenumber - 1].current.height
      );
      pic.onload = () => {
        newctx.drawImage(pic, 0, 0);
      };
    }
  };
  const getPdf = async (filename, course) => {
    const response = await axios.post(props.url + "/api/getPdf", {
      pdf_name: filename + ".pdf",
      course_id: course,
    });
    if (response.data != null) {
      const buffer = response.data.buffer.data;
      reloadpdf(
        buffer,
        Refs,
        setPagecount,
        setpages,
        setfiles,
        setNextHeight,
        setHeight
      );
    }
  };
  const redo = () => {
    if (redoimages[pagenumber - 1].length >= 1) {
      var pic = new Image();
      const newctx = WritingRefs[pagenumber - 1].current.getContext("2d");
      pic.src = redoimages[pagenumber - 1].pop();
      images[pagenumber - 1].push(pic.src);
      newctx.clearRect(
        0,
        0,
        WritingRefs[pagenumber - 1].current.width,
        WritingRefs[pagenumber - 1].current.height
      );
      pic.onload = () => {
        newctx.drawImage(pic, 0, 0);
      };
    }
  };

  const changeWidth = (event) => {
    setSize(event.target.value);
  };
  const changeWidth1 = (event) => {
    setEraser(event.target.value);
  };

  //need a way to press canvas automatically
  const Selection = () => {
    return (
      <div className="select" style={{ top: state + 17 }}>
        <input
          type="range"
          onChange={changeWidth}
          min={3}
          max={20}
          step={1}
          value={size}
          id="sel"
          className="form-range"
        ></input>
      </div>
    );
  };

  //need to show message displaying button name pressed
  const Selection1 = () => {
    return (
      <div className="select" style={{ top: state + 65 }}>
        <input
          type="range"
          onChange={changeWidth1}
          min={3}
          max={20}
          step={1}
          value={erasersize}
          id="sel1"
          className="form-range"
        ></input>
      </div>
    );
  };
  const Shapes = () => {
    return (
      <div className="select" style={{ top: state + 170, width: 210 }}>
        <img
          src="./images/circle.png"
          className="shap"
          width={32}
          onClick={() => setShape("circle")}
        ></img>
        <img
          src="./images/line.png"
          className="shap"
          width={32}
          onClick={() => setShape("line")}
        ></img>
        <img
          className="shap"
          src="./images/rectangle.png"
          width={50}
          onClick={() => setShape("rectangle")}
        ></img>
        <img
          src="./images/oval.png"
          className="shap"
          width={32}
          onClick={() => setShape("oval")}
        ></img>
      </div>
    );
  };

  const Menu = () => {
    return (
      <div className="Menu">
        <div style={{ marginTop: 7 }} className="gradien">
          {/* <Link to={`../dashboard`} style={{textDecoration: "none"}} className="gradien">Dashboard</Link> */}
          Dashboard
        </div>
        <div
          style={{ marginTop: 3 }}
          className="gradien"
          onClick={() => {
            props.changeval(false);
          }}
        >
          {/* <Link to={`../dashboard`} style={{textDecoration: "none" }} className="gradien">Courses</Link> */}
          Courses
        </div>
        <div
          style={{ marginTop: 3 }}
          onClick={() => {
            props.changeval(true);
          }}
        >
          <p
            className="gradien"
            onClick={() => {
              if (tool) setTool(false);
              else setTool(true);
            }}
          >
            {tool ? "Hide Tools" : "Show Tools"}
          </p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    pdf = document.getElementById("files");
    // console.log(document.URL);
    window.addEventListener("scroll", (event) => {
      setPagenumber(Math.floor((window.scrollY + 50) / Height) + 1);
    });
    if (pdfRef.current) {
      pdfctx.current = pdfRef.current.getContext("2d");
    }
    if (firstUpdate.current) {
      firstUpdate.current = false;
      if (
        sessionStorage.getItem("pdf_name") != undefined ||
        sessionStorage.getItem("pdf_name") != null
      ) {
        // setFetchLoading(true);
        props.setPdf(sessionStorage.getItem("pdf_name"));
        // setFetchLoading(false);
      }
      if (
        props.pdf_name != " " &&
        props.data != null &&
        props.pdf_name != undefined &&
        props.pdf_name != null
      ) {
        if (first.current == false) {
          first.current = true;
          // if(props.data.course_id) getPdf(props.pdf_name, props.data.course_id);
          // else getPdf(props.pdf_name, props.course_id)
          getPdf(props.pdf_name, props.course_id);
          sessionStorage.setItem("pdf_name", props.pdf_name);
        }
      }
      setstate(document.getElementById("pencil").getBoundingClientRect().top);
      pdfChange(
        pdf,
        Refs,
        setPagecount,
        setpages,
        setfiles,
        setNextHeight,
        setHeight
      );
    } else {
      if (prevclicked) {
        window.scrollBy(0, -Height);
        setprevClicked(false);
      }
      if (clicked) {
        window.scrollBy(0, Height);
        setClicked(false);
      }
      if (files != null && files != undefined) {
        Import(
          files,
          Refs,
          TempRefs,
          setImported,
          images,
          redoimages,
          setFetchLoading
        );
        let arr = [];
        for (var i = 0; i < Refs.length; i++) {
          if (Refs[i].current === null || Refs[i].current === undefined) {
            continue;
          }
          arr.push(Refs[i]);
        }
        setRefs(arr);
        setfiles(null);
      }
    }
  }, [pages, files, state, clicked, prevclicked, pagewidth, fetchLoading]);

  useEffect(() => {
    if (unload.current) {
      window.onbeforeunload = () => {
        setRefresh(true);
        return "Are you sure";
      };
      unload.current = false;
    }
  }, []);

  const Loading = () => {
    return (
      <div>
        <Modal
          show={isloading}
          onHide={() => {
            setLoading(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {props.pdf_name == null ||
              props.pdf_name == undefined ||
              props.pdf_name == " "
                ? "Export PDF"
                : "Export Or Save"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {Pressed
                ? "Click on the button below and wait for a few seconds as the PDF gets exported."
                : "Downloading the PDF..."}
              {props.pdf_name == null ||
              props.pdf_name == undefined ||
              props.pdf_name == " " ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter filename without extension"
                    style={{ width: "100%", marginTop: "10px" }}
                    id="filename"
                    required
                  ></input>
                </div>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {props.pdf_name == null ||
            props.pdf_name == undefined ||
            props.pdf_name == " " ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (
                      document.getElementById("filename").value === null ||
                      document.getElementById("filename").value === undefined ||
                      document.getElementById("filename").value === ""
                    ) {
                      alert("Please enter filename");
                    } else {
                      download(
                        Refs,
                        WritingRefs,
                        pages,
                        false,
                        "",
                        document.getElementById("filename").value,
                        setLoading
                      );
                      // setFetchLoading(true);
                      setLoading(false);
                    }
                  }}
                  id="blah"
                >
                  Download
                </Button>
                <Button
                  variant="secondary"
                  onClick={async () => {
                    if (
                      document.getElementById("filename").value === null ||
                      document.getElementById("filename").value === undefined ||
                      document.getElementById("filename").value === ""
                    ) {
                      alert("Please enter filename");
                    } else {
                      // setFetchLoading(true);
                      download(
                        Refs,
                        WritingRefs,
                        pages,
                        true,
                        props.url,
                        document.getElementById("filename").value,
                        props.setPdf,
                        newloading
                      );
                      // setFetchLoading(true);
                      setLoading(false);
                      // setFetchLoading(false);
                    }
                  }}
                >
                  Export To LMS
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    download(
                      Refs,
                      WritingRefs,
                      pages,
                      false,
                      "",
                      props.pdf_name
                    );
                    setLoading(false);
                  }}
                  id="blah"
                >
                  Download
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    download(
                      Refs,
                      WritingRefs,
                      pages,
                      true,
                      props.url,
                      props.pdf_name,
                      props.setPdf
                    );
                    setLoading(false);
                  }}
                >
                  Save To LMS
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const Refresh = () => {
    return (
      <div>
        <Modal
          show={isrefresh}
          onHide={() => {
            setRefresh(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {props.pdf_name == null ||
              props.pdf_name == undefined ||
              props.pdf_name == " "
                ? "Export PDF"
                : "Save PDF"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {Pressed
                ? "Click on the save button to save your board and wait for a few seconds as the PDF gets exported."
                : "Sending the PDF..."}
              <div>
                {props.pdf_name == null ||
                props.pdf_name == undefined ||
                props.pdf_name == " " ? (
                  <input
                    type="text"
                    placeholder="Enter filename without extension"
                    style={{ width: "100%", marginTop: "10px" }}
                    id="filename"
                    required
                  ></input>
                ) : null}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {props.pdf_name == null ||
            props.pdf_name == undefined ||
            props.pdf_name == " " ? (
              <Button
                variant="primary"
                onClick={() => {
                  if (
                    document.getElementById("filename").value === null ||
                    document.getElementById("filename").value === undefined ||
                    document.getElementById("filename").value === ""
                  ) {
                    alert("Please enter filename");
                  } else {
                    download(
                      Refs,
                      WritingRefs,
                      pages,
                      true,
                      props.url,
                      document.getElementById("filename").value,
                      props.setPdf
                    );
                    setRefresh(false);
                  }
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  download(
                    Refs,
                    WritingRefs,
                    pages,
                    true,
                    props.url,
                    props.pdf_name,
                    props.setPdf
                  );
                  setRefresh(false);
                }}
              >
                Save
              </Button>
            )}

            <Button
              variant="danger"
              onClick={() => {
                setRefresh(false);
              }}
              id="blah"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  //use merge-images and add the pdf to its own canvas element, drag and drop selected portion/copy and paste, duplicating page,implementing proper eraser
  return newloading.current ? (
    <LoadingScreen />
  ) : (
    <div>
      {pages.map((item, index) => {
        return (
          <Page
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            mouseDown={mouseDown}
            setMouseDown={setMouseDown}
            last={last}
            setPosition={setPosition}
            size={size}
            setSize={setSize}
            erasersize={erasersize}
            setEraser={setEraser}
            shape={shape}
            setShape={setShape}
            drawing={drawing}
            setDrawing={setDrawing}
            number={item}
            setPagenumber={setPagenumber}
            setCanvasRef={setCanvasRef}
            Refs={Refs}
            images={images}
            setCtx={setCtx}
            redoimages={redoimages}
            TempRefs={TempRefs}
            WritingRefs={WritingRefs}
            CurrHeight={CurrHeight}
            Height={Height}
            pagenum={item}
            setshow={[setshow, setshow1, setshow2, setshow3]}
            undo={undo}
            redo={redo}
            width={pagewidth}
            imported={imported}
          />
        );
      })}
      {isloading ? <Loading /> : null}
      {isrefresh ? <Refresh /> : null}
      {show ? <Selection /> : null}
      {show1 ? <Selection1 /> : null}
      {show2 ? <Shapes /> : null}
      {/* {show3 ? <div>
                <Menu/>
            </div>: null} */}
      <div className="pos">
        {/* need to change this ,also need to find a better way to identify page number*/}

        <input
          type={"file"}
          id="files"
          accept="application/pdf"
          style={{ display: "none" }}
        />
        {/* for file upload we need to add file to server then load it from there, will have to use scale to adjust sizes.,addpage to the nextpage not lastpage*/}
      </div>

      <div className="page">
        <p id="tp">
          {pagenumber} / {page + 1}
        </p>
      </div>

      <div className="profile">
        {/* <div>{props.data!=null&&props.data.name}
            <img src="./images/Arrow-down.png" id='down' onClick={()=>{
                setshow(false);
                setshow1(false);
                setshow2(false);
                if(!show3) setshow3(true);
                else setshow3(false);
            }} alt="fuckoff"></img>
            </div> */}
        <p
          className="gradien"
          onClick={() => {
            if (tool) setTool(false);
            else setTool(true);
          }}
        >
          {tool ? "Hide Tools" : "Show Tools"}
        </p>
      </div>

      <div id="Buttons">
        <button
          className="buttons"
          onClick={() => {
            alert(
              "This feature is under development, will be functional in the next version."
            );
          }}
        >
          Share
        </button>
        <button
          className="buttons Export"
          onClick={(e) => {
            setLoading(true);
          }}
        >
          {props.pdf_name == null ||
          props.pdf_name == undefined ||
          props.pdf_name == " "
            ? "Export"
            : "Save"}
        </button>
        <button
          className="buttons Import"
          onClick={() => {
            document.getElementById("files").click();
          }}
        >
          Import
        </button>
        {/* <div className='update'>Pdf loading</div> */}
      </div>
      <div
        className="prev-page"
        onClick={(e) => {
          setprevClicked(true);
        }}
      >
        <img
          src="./images/left.png"
          alt="prev-page"
          width="32px"
          height="32px"
        ></img>
      </div>

      <div
        className="next-page"
        onClick={(e) => {
          setClicked(true);
          if (pagenumber > page) {
            setpages((prevpages) => [...prevpages, page + 1]);
            setPagecount(page + 1);
          }
        }}
      >
        <img
          src="./images/right.png"
          alt="next-page"
          width="32px"
          height="32px"
        ></img>
      </div>
      {tool ? (
        <div className="pos contains">
          {/* use toggler  */}
          <div
            id="pencil"
            className="editing"
            onClick={() => {
              setShape("pen");
              setshow1(false);
              setshow2(false);
              setshow3(false);
              if (!show) setshow(true);
              else setshow(false);
            }}
          >
            <img
              src="./images/pencil.png"
              alt="pencil"
              id="pencilimage"
              width="35px"
              height="35px"
            ></img>
          </div>
          <div
            id="eraser"
            className="editing"
            onClick={() => {
              setShape("eraser");
              setshow(false);
              setshow2(false);
              setshow3(false);
              if (!show1) setshow1(true);
              else setshow1(false);

              // else{
              //     alert("The Eraser function doesn't work if a pdf is imported. It will be fixed in the next version of the product. Please use the undo button instead.")
              // }
            }}
          >
            <img
              src="./images/eraser.png"
              alt="eraser"
              className="addnewMargin"
              width="35px"
              height="35px"
            ></img>
          </div>

          <div id="palette" className="editing">
            <input
              type="color"
              id="coler"
              onChange={(e) => {
                setSelectedColor(e.target.value);
              }}
            ></input>
            <img
              src="./images/palette.png"
              alt="colors"
              className="addMargin"
              width="35px"
              height="35px"
              onClick={() => {
                document.getElementById("coler").click();
              }}
            ></img>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------- */}
          <div
            id="lassoTool"
            className="editing"
            onClick={() => {
              // setShape("pen");
              // setshow1(false);
              // setshow2(false);
              // setshow3(false);
              // if (!show) setshow(true);
              // else setshow(false);

              const script = document.createElement("script");
              script.src = "./lassoTool/lasso_tool_soham.js";
              document.body.appendChild(script);
              
            }}
            >
            <img
              src="./images/lasso.png"
              alt="pencil"
              id="pencilimage"
              width="35px"
              height="35px"
              ></img>
          </div>
            {/* ---------------------------------------------------------------------------------------------------------- */}
          <div
            id="shape"
            className="editing"
            onClick={() => {
              // if(!imported){
                  setshow1(false);
              setshow(false);
              setshow3(false);
              setSize(3);
              if (!show2) setshow2(true);
              else setshow2(false);
              // }
              // else alert("This feature will be released in the next version of the product")
            }}
          >
            <img
              src="./images/shape.png"
              alt="shapes"
              className="addMargin"
              width="35px"
              height="35px"
            ></img>
          </div>
          {/* need to change */}
          <div id="add" className="editing">
            <img
              src="./images/add.png"
              alt="add page"
              className="addMargin"
              width="35px"
              height="35px"
              onClick={() => {
                dispatch(addItem());
                setClicked(true);
                let newpages = [];
                for (let i = 0; i < pages.length; i++) {
                  if (pages[i] >= pagenumber) newpages.push(pages[i] + 1);
                  else newpages.push(pages[i]);
                }

                newpages.push(pagenumber);
                setpages(newpages);
                setPagecount(page + 1);
              }}
            ></img>
          </div>

          <div
            id="arrow"
            className="editing"
            onClick={() => {
              alert(
                "This feature is under development, will be functional in the next version."
              );
            }}
          >
            <img
              src="./images/arrows.png"
              alt="move selected object"
              className="addMargin"
              width="35px"
              height="35px"
            ></img>
          </div>

          <div
            id="text"
            className="editing"
            onClick={() => {
              alert(
                "This feature is under development, will be functional in the next version."
              );
            }}
          >
            <img
              src="./images/text.png"
              alt="TextBox"
              className="addMargin"
              width="35px"
              height="35px"
            ></img>
          </div>

          <div className="editing">
            <img
              src="./images/undo.png"
              alt="undo "
              id="undo"
              className="addMargin"
              width="35px"
              height="35px"
              onClick={(e) => {
                e.currentTarget.disabled = true;
                undo();
                setTimeout(function () {
                  document.getElementById("undo").disabled = false;
                }, 500);
              }}
            ></img>
          </div>

          <div className="editing">
            <img
              src="./images/redo.png"
              alt="redo"
              id="redo"
              className="addMargin"
              width="35px"
              height="35px"
              onClick={(e) => {
                e.currentTarget.disabled = true;
                redo();
                setTimeout(function () {
                  document.getElementById("redo").disabled = false;
                }, 500);
              }}
            ></img>
          </div>

          <div id="trash" className="editing">
            <img
              src="./images/trash.png"
              alt="clear"
              className="addMargin"
              width="35px"
              height="35px"
              onClick={() => {
                clear(canvasRef, ctx, pagenumber, images);
              }}
            ></img>
          </div>
        </div>
      ) : null}

      <div>
        {/* <div style={{"margin-top": "1000px"}}>
            <form action="https://v2.convertapi.com/convert/pdf/to/compress?Secret=9zpRDtwg9nncoVHi&download=attachment" method="post" enctype="multipart/form-data">
                <input type="file" name="File" />
                <input type="submit" value="Convert file"/>
            </form>
        </div> */}
      </div>
      {/* <canvas width={800} height={400} ref={pdfRef}> </canvas> */}
    </div>
  );
}
export default Canvas;
