import React, { Component } from "react";
import Tree, { OptionsProps } from "./Tree";

interface IndexState {
    name: string;
    value: string[];
    options: OptionsProps[];
}

class Index extends Component<{}, IndexState> {
    state: Readonly<IndexState> = {
        name: "tree",
        value: ["8"],
        options: [
            {
                value: "1",
                title: "1",
            },
            {
                value: "2",
                title: "2",
                children: [
                    {
                        value: "3",
                        title: "3",
                    },
                    {
                        value: "4",
                        title: "4",
                    },
                ],
            },
            {
                value: "5",
                title: "5",
                children: [
                    {
                        value: "6",
                        title: "6",
                    },
                ],
            },
            {
                value: "7",
                title: "7",
                children: [
                    {
                        value: "8",
                        title: "8",
                    },
                ],
            },
        ],
    };

    render() {
        return <Tree {...this.state} />;
    }
}

export default Index;
