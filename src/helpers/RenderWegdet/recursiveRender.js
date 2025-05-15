import "@/styles/recursiveRender.module.scss"; // global CSS
import { widgetRegistry } from "@/helpers/widgetRegistry"; // Static import

const RecursiveRender = ({ node, globalProps = {} }) => {
  if (!node) return null;
  switch (node.type) {
    case "row":
      return (
        <div className="row" key={node.id} style={{ display: 'flex' }}>
          {node?.children?.map((child) => (
            <RecursiveRender key={child.id} node={child} globalProps={globalProps} />
          ))}
        </div>
      );

    case "column":
      return (
        <div className="column" key={node.id} style={{ flex: 1 }}>
          {node?.children?.map((child) => (
            <RecursiveRender key={child.id} node={child} globalProps={globalProps} />
          ))}
        </div>
      );

    case "component":
      const Component = widgetRegistry?.[node?.content];
      if (!Component) {
        return <div key={node.id}>Unknown component: {node.content}</div>;
      }
      return <Component key={node?.id} {...globalProps} />;

    default:
      return null;
  }
};

const RecursiveRenderWrapper = ({ nodes, globalProps = {} }) => {
 
  return (
    <>
      {nodes?.map((node) => (
        <RecursiveRender key={node.id} node={node} globalProps={globalProps} />
      ))}
    </>
  );
};

export default RecursiveRenderWrapper;
