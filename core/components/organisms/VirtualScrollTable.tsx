import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import Match from "../../domains/Match";
import MatchRow, { MatchGroupRow, MatchRowHeader, RowData } from "./MatchRow";

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  margin: 0 -16px;
  position: relative;
`;

function getChunks(matches: RowData[], chunkSize: number): Array<RowData[]> {
  const R = [];
  for (let i = 0; i < matches.length; i += chunkSize)
    R.push(matches.slice(i, i + chunkSize));
  return R;
}

const VirtualScrollTable = ({
  matches,
  rowHeight = 50,
}: {
  matches: RowData[];
  rowHeight?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [chunks, setChunks] = useState<Array<RowData[]>>([]);
  const [chunkSize, setChunkSize] = useState(0);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [currentChunk, setCurrentChunk] = useState(0);

  useEffect(() => {
    let options = {
      root: ref.current,
      rootMargin: "0px",
      threshold: 0.4,
    };

    setObserver(
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index =
              +(entry.target as HTMLDivElement).getAttribute("data-index") || 0;
            setCurrentChunk(index);
          }
        });
      }, options)
    );

    return () => {
      observer?.disconnect();
      setObserver(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const chunkSize = Math.ceil((ref.current?.clientHeight || 0) / rowHeight);
    setChunkSize(chunkSize);
    setChunks(getChunks(matches, chunkSize));
  }, [ref, matches, rowHeight, setChunks]);

  const chunkRef = useCallback(
    (node: Element | null) => {
      if (!node) return;
      observer?.observe(node);
    },
    [observer]
  );

  return (
    <Wrapper ref={ref}>
      <MatchRowHeader />
      {chunks.map((chunk, index) => (
        <div
          className="chunk"
          ref={chunkRef}
          key={index}
          style={{ height: `${chunk.length * rowHeight}px` }}
          data-index={index}
        >
          {[currentChunk, currentChunk + 1, currentChunk - 1].includes(index) &&
            chunk.map((match, i) =>
              "type" in match ? (
                <MatchGroupRow group={match.data} />
              ) : (
                <MatchRow key={`${index}-${i}`} match={match as Match} />
              )
            )}
        </div>
      ))}
    </Wrapper>
  );
};

export default VirtualScrollTable;
