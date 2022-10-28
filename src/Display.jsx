export const Display = ({ output, input }) => {
  return (
    <div>
      <div className="output">{output}</div>
      <div className="input" id="display">
        {input}
      </div>
    </div>
  );
};
