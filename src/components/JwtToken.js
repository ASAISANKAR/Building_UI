import {useState} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const JwtToken = () => {

const jwt_token = localStorage.getItem("jwt");
const [header, payload, signature] = jwt_token.split(".");
const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if(copied)
            setCopied(false);
        else {
            navigator.clipboard.writeText(jwt_token)
                .then(() => {
                    setCopied(true);
                    console.log("Copied to clipboard!");
                })
                .catch((err) => {
                    setCopied(false);
                    console.error("Failed to copy:", err);
                });
        }
    };
    return (
        <div style={{ width: '400px' }}>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Your's JWT Token
                    </Typography>
                    <Box sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                        <span style={{ color: "#f6513b" }}>{header}</span>.
                        <span style={{ color: "#7122c5" }}>{payload}</span>.
                        <span style={{ color: "#12d622" }}>{signature}</span>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button onClick={handleCopy}>
                        {copied ? <CheckIcon /> : <ContentCopyIcon />}
                    </Button>
                </CardActions>
            </Card>
            );
        </div>
    );

};
export default JwtToken;