import React, { Component } from "react";
import TreeNode from './TreeNode';
import { init, destroyed } from './refs'

export interface OptionsProps {
  value: string;
  title: string;
  children?: OptionsProps[];
}

interface TreeProps {
  name: string;
  value: string[];
  options: OptionsProps[];
}

class Tree extends Component<TreeProps> {

  componentDidMount(): void {
    console.log(init(this.props.name, this))
  }

  componentWillUnmount(): void {
    destroyed(this.props.name)
  }

  render() {
    const { name, options } = this.props;
    return (
      <div className="tree-wrapper">
        <ul className="tree">
          {options.map((option: OptionsProps, idx: number) => (
            <TreeNode
              key={`${name}-${option.title}-${idx}`}
              propertyKey={`${name}-${idx}`}
              name={name}
              options={option}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Tree;
