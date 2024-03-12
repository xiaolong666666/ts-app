import React, { Component } from "react";
import { get, set } from './refs';
import { OptionsProps } from './Tree'
import './index.css';

interface TreeNodeProps {
  name: string;
  propertyKey: string;
  options: OptionsProps;
}

interface TreeNodeState {
  expand: boolean;
  isChecked: boolean;
}

class TreeNode extends Component<TreeNodeProps, TreeNodeState> {
  state: Readonly<TreeNodeState> = {
    expand: false,
    isChecked: false,
  };

  fetchData = () => {
    const tree = get(this.props.name)
    const defaultValue = tree.tree.props.value
    if (defaultValue.includes(this.props.options.value)) {
      this.setState({ isChecked: true })
    }
  }

  componentDidMount(): void {
    setTimeout(() => {
      set(this.props.name, this)
      this.fetchData()
    })
  }

  render() {
    const {
      name,
      propertyKey,
      options: { title, children },
    } = this.props;
    const { isChecked } = this.state
    const isHasLeaf = (children as Array<OptionsProps>)?.length > 0

    return (
      <div className="tree-node">
        <div className="title-wrapper">
          <div className="arrow" />
          <input type="checkbox" name={propertyKey} id={propertyKey} checked={isChecked} onChange={() => this.setState({ isChecked: !isChecked })} />
          <div>{title}</div>
        </div>
        <ul className="tree" style={{ display: isHasLeaf ? 'block' : 'none' }} >
          {children?.map((option: OptionsProps, idx: number) => (
            <TreeNode
              key={`${name}-${option.title}-${idx}`}
              propertyKey={`${propertyKey}-${idx}`}
              name={name}
              options={option}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TreeNode;
