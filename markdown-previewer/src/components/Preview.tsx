import React from "react";
import { PreviewProps } from "../types/PreviewTypes";

const Preview: React.FC<PreviewProps> = props => {
	return <div id="preview" dangerouslySetInnerHTML={props.marked} />;
};

export default Preview;
