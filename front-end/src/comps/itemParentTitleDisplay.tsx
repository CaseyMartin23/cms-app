import React from "react";

import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

const ItemParentTitleFlexDiv = styled.div`
  display: flex;
  padding: 8px;
  color: white;
`;

const ItemParentTitleHr = styled.hr`
  border: 0;
  height: 0;
  background-color: #3f51b5;
  border-bottom: 1px solid;
  border-top: 1px solid;
  flex-grow: ${(props: ItemParentTitleHrProps) =>
    props.flexGrow && props.flexGrow};
`;

type ItemParentTitleHrProps = {
  flexGrow: number;
};

type ItemParentTitlePropsType = {
  itemParentTitle: string;
};

const ItemParentTitle: React.FC<ItemParentTitlePropsType> = ({
  itemParentTitle,
}) => (
  <ItemParentTitleFlexDiv>
    <ItemParentTitleHr flexGrow={2} />
    <Typography style={{ flexGrow: 1 }}>
      {itemParentTitle.length > 29
        ? `${itemParentTitle.slice(0, 30)}...`
        : itemParentTitle}
    </Typography>
    <ItemParentTitleHr flexGrow={7} />
  </ItemParentTitleFlexDiv>
);

export default ItemParentTitle;
