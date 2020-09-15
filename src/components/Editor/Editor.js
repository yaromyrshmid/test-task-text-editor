/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import BackGroundColor from "./Controls/BackGroundColor";
import Color from "./Controls/Color";
import FontFamily from "./Controls/FontFamily";
import FontSize from "./Controls/FontSize";

import "./editor.css";
import JSONPreview from "./JSONPreview";

const Editor = () => {
  const editor = useRef(null);
  // Controls state
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [color, setColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  // Parsed content
  const [parsedContent, setParsedContent] = useState([]);

  useEffect(() => {
    editor.current = document.getElementById("editor");

    document.addEventListener("DOMSubtreeModified", handleEditorContentChange);

    document.execCommand("styleWithCSS", false, true);

    return () => {
      document.removeEventListener(
        "DOMSubtreeModified",
        handleEditorContentChange
      );
    };
  }, []);

  // Controls change events
  useEffect(() => {
    editor.current.focus();
    document.execCommand("fontName", false, fontFamily);
    handleEditorContentChange();
  }, [fontFamily]);

  useEffect(() => {
    editor.current.focus();
    document.execCommand("fontSize", false, fontSize);
    handleEditorContentChange();
  }, [fontSize]);

  useEffect(() => {
    editor.current.focus();
    document.execCommand("foreColor", false, color);
    handleEditorContentChange();
  }, [color]);

  useEffect(() => {
    editor.current.focus();
    document.execCommand("hiliteColor", false, backgroundColor);
    handleEditorContentChange();
  }, [backgroundColor]);

  // Handle JSON creation
  const handleEditorContentChange = () => {
    setParsedContent(parseNode(editor.current.childNodes));
  };

  const parseNode = (node) => {
    const nodeArr = [];
    const mapNode = (node) => {
      if (!!node.childNodes?.length) {
        // If node is parent - map through children
        node.childNodes.forEach(mapNode);
      } else {
        // If node has no children and has text content - create new object
        if (node.textContent) {
          const nodeObject = { text: node.textContent };
          // Get styles from parent element (use parent node if it has styles, use computed styles if they are inherited)
          const parentStyle = node.parentNode.style;
          nodeObject.fontFamily =
            parentStyle.fontFamily ||
            getComputedParentStyle(node.parentNode, "font-family");
          nodeObject.fontSize =
            parentStyle.fontSize ||
            getComputedParentStyle(node.parentNode, "font-size");
          nodeObject.color =
            parentStyle.color ||
            getComputedParentStyle(node.parentNode, "color");

          nodeObject.backgroundColor =
            parentStyle.backgroundColor ||
            getComputedParentStyle(node.parentNode, "background-color");

          nodeArr.push(nodeObject);
        }
      }
    };

    node.forEach(mapNode);

    return removeDuplicatedNodeObjects(nodeArr);
  };

  const getComputedParentStyle = (parent, property) =>
    window.getComputedStyle(parent).getPropertyValue(property);

  const removeDuplicatedNodeObjects = (nodeArr) => {
    console.log(nodeArr);
    return nodeArr.reduce((accumulator, currentElement) => {
      const lastElement = accumulator[accumulator.length - 1];
      if (
        accumulator.length > 1 &&
        lastElement &&
        currentElement.fontFamily ===
          accumulator[accumulator.length - 1].fontFamily &&
        currentElement.fontSize ===
          accumulator[accumulator.length - 1].fontSize &&
        currentElement.color === accumulator[accumulator.length - 1].color &&
        currentElement.backgroundColor ===
          accumulator[accumulator.length - 1].backgroundColor
      )
        return [
          ...accumulator.slice(0, accumulator.length - 1),
          { ...currentElement, text: lastElement.text + currentElement.text },
        ];

      return [...accumulator, currentElement];
    }, []);
  };

  return (
    <div className="container">
      <h1 className="title">Text editor</h1>

      <div className="controls">
        <FontFamily value={fontFamily} onChange={setFontFamily} />

        <FontSize value={fontSize} onChange={setFontSize} />

        <Color value={color} onChange={setColor} />

        <BackGroundColor
          value={backgroundColor}
          onChange={setBackgroundColor}
        />
      </div>

      <div
        id="editor"
        contentEditable="true"
        className="editor"
        spellCheck={false}
        onChange={handleEditorContentChange}
      />

      <JSONPreview content={parsedContent} />
    </div>
  );
};

export default Editor;
