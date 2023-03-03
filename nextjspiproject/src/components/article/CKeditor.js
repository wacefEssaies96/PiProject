import React, { useEffect, useRef } from "react"
import SpinnerLoading from "../layouts/SpinnerLoading";

export default function CKeditor({ change, editorLoaded, name, value }) {

    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        change(() => data)
                    }}
                />
            ) : (
                <SpinnerLoading></SpinnerLoading>
            )}
        </>
    )
}