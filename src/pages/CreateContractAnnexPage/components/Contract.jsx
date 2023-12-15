import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { filesDb } from "../../../components/Firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  getStorage,
} from "firebase/storage";
import { Icon } from "@iconify/react";
import "../css/_contract.css";
import "../css/_top-bar.css";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-documenteditor";
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from "@syncfusion/ej2-pdf-export";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRGVGfV5yd0VCal9YTnRdUiweQnxTdEZiWH5YcHBRQGJZUkB1WQ=="
);

function Contract() {
  

  return (
    <div>
      
    </div>
  );
}

export default Contract;
