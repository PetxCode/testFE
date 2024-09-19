import * as Blockly from "blockly/core";

export function initCustomBlocks() {
  Blockly.Blocks["move_up"] = {
    init: function () {
      this.appendDummyInput().appendField("move up");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.JavaScript["move_up"] = function () {
    return "moveUp();\n";
  };

  Blockly.Blocks["move_down"] = {
    init: function () {
      this.appendDummyInput().appendField("move down");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.JavaScript["move_down"] = function () {
    return "moveDown();\n";
  };

  Blockly.Blocks["move_left"] = {
    init: function () {
      this.appendDummyInput().appendField("move left");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.JavaScript["move_left"] = function () {
    return "moveLeft();\n";
  };

  Blockly.Blocks["move_right"] = {
    init: function () {
      this.appendDummyInput().appendField("move right");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.JavaScript["move_right"] = function () {
    return "moveRight();\n";
  };
}
