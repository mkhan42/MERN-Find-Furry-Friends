import { Button, Icon, Label } from "semantic-ui-react";

export default function ButtonUpvote() {
  return (
    <div>
      <Button
        color="red"
        content="Like"
        icon="heart"
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: "2,048",
        }}
      />
    </div>
  );
}
