import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    fontSize: 8,
    marginBottom: 4,
  },
});

type Props = {
  code: string;
  name: string;
  address: string;
  geo: string;
};

function PublicFacilityCard(props: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.pos}>{props.code}</Typography>
        <Typography className={classes.title}>{props.name}</Typography>
        <Typography className={classes.pos}>{props.address}</Typography>
        <Typography className={classes.pos}>{props.geo}</Typography>
      </CardContent>
    </Card>
  );
}

export default PublicFacilityCard;
