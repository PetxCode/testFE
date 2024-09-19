import React, { useRef, useEffect } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import "blockly/msg/en";

const BlocklyComponent: React.FC<{ onRunCode: (code: string) => void }> = ({
  onRunCode,
}) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const toolbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blocklyDiv.current && toolbox.current) {
      const workspace = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
      });

      const generateCode = () => {
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        onRunCode(code);
      };

      workspace.addChangeListener(generateCode);

      return () => {
        workspace.dispose();
      };
    }
  }, [onRunCode]);

  return (
    <div className="flex">
      <div
        ref={blocklyDiv}
        className="w-1/2 h-96 border-2 border-gray-300"
      ></div>

      {/* Replace <xml> with a div and specify the data attributes */}
      <div
        ref={toolbox}
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{
          __html: `
            <xml xmlns="http://www.w3.org/1999/xhtml">
              <category name="Movement" colour="120">
                <block type="move_up"></block>
                <block type="move_down"></block>
                <block type="move_left"></block>
                <block type="move_right"></block>
              </category>
            </xml>
          `,
        }}
      />
    </div>
  );
};

export default BlocklyComponent;
