import Tree from 'react-d3-tree';
import data from '../../data/geneology.json';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.

export const Genealogy = () => {
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div className="relative">
      <div id="treeWrapper" style={{ width: '100%', height: '80vh' }}>
        <Tree
           data={data as any} // Type assertion to temporarily fix type error
           orientation="vertical"
           pathFunc="diagonal"
           translate={{ x: 200, y: 50 }} // Add some padding from edges
           separation={{ siblings: 1, nonSiblings: 1.25 }} // Improve spacing
        />
      </div>
      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md font-bold">
        UNDER CONSTRUCTION
      </div>
    </div>
  );
}