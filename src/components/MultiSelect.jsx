import { useState, useEffect } from "react";

const MultiSelect = (props) => {
  const { treeData ,onSelectionChange } = props;
  const [selected, setSelected] = useState(new Set());
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [chips, setChips] = useState([]);

  useEffect(() => {
    const myArray = Array.from(selected);
    console.log(myArray);
  }, [selected]);


useEffect(() => {
    // Send current selected IDs array to parent if callback provided
    if (onSelectionChange) {
      onSelectionChange(Array.from(selected));
    }
  }, [selected]);



  // Find node by ID (DFS)
  const findNodeById = (nodes, id) => {
    for (const n of nodes) {
      if (n.id === id) return n;
      const found = findNodeById(n.children, id);
      if (found) return found;
    }
    return null;
  };

  // Update selection recursively
  const updateSelection = (node, isSelected) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(node.id);
        console.log(`Checked: ${node.id}`);
      } else {
        newSet.delete(node.id);
      }

      // Recursively update children
      node.children.forEach((child) => {
        if (isSelected) {
          newSet.add(child.id);
        } else {
          newSet.delete(child.id);
        }
        updateSelection(child, isSelected);
      });

      return newSet;
    });
  };

  // Toggle expanded state for a node
  const toggleExpand = (nodeId, e) => {
    e.stopPropagation();
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Remove a chip
  const removeChip = (nodeId, e) => {
    e.stopPropagation();
    const node = findNodeById(treeData, nodeId);
    if (node) {
      updateSelection(node, false);
    }
  };

  // Render tree recursively
  const renderTree = (nodes, level = 0) => {
    return (
      <ul
        className={`list-none ${level === 0 ? "pl-2" : "pr-10"}`}
        style={{ display: "block" }}
      >
        {nodes.map((node) => {
          const hasChildren = node.children.length > 0;
          const isExpanded = expandedNodes.has(node.id);

          return (
            <li key={node.id} className="my-1 cursor-default">
              <div className="flex items-center">
                {hasChildren && (
                  <span
                    // className="toggle inline-block w-4 cursor-pointer mr-1"
                    className="toggle inline-block w-4 cursor-pointer text-[#242752]"
                    onClick={(e) => toggleExpand(node.id, e)}
                  >
                    {/* {isExpanded ? "▼" : "◀"} */}
                    {isExpanded ? "▼" : "◀"}
                  </span>
                )}

                <input
                  type="checkbox"
                  data-id={node.id}
                  //   className="mr-2"
                  className="ml-2"
                  checked={selected.has(node.id)}
                  onChange={(e) => updateSelection(node, e.target.checked)}
                />

                <span>{node.label}</span>
              </div>

              {hasChildren &&
                isExpanded &&
                renderTree(node.children, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  // Update chips whenever selection changes
  useEffect(() => {
    const newChips = [];
    selected.forEach((id) => {
      const node = findNodeById(treeData, id);
      if (node) {
        newChips.push(
          <div
            key={id}
            className="chip inline-flex items-center bg-gray-200 rounded-full px-2 py-0.5 m-1"
          >
            <span>{node.label}</span>
            <span
              className="remove ml-1 cursor-pointer"
              onClick={(e) => removeChip(node.id, e)}
            >
              ×
            </span>
          </div>
        );
      }
    });
    setChips(newChips);
  }, [selected]);

  return (
    <div >
      

      <div className="tree border border-gray-300 rounded-lg p-4 bg-white shadow-sm h-[240px] overflow-y-auto">
        {renderTree(treeData)}
      </div>


      <div className="text-xl font-bold my-4">گروه های انتخاب شده:</div>
      <div className="mb-4 p-2 bg-gray-50 rounded h-[100px] overflow-y-auto">
        <div id="selected-chips" className="flex flex-wrap">
          {chips}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
