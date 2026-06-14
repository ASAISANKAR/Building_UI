import {Card, CardBody, CardContent, CardHeader, CardRow, IconCheck, IconContentCopy} from '@cdkglobal/radial';
import styled from 'styled-components';
import {useState} from "react";

const StyledCustomFooter = styled.div`
  display: flex;
  border-top: 1px solid lightgray;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 8px;
  padding: 16px;
`;

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
            <Card>
                <CardBody>
                    <CardHeader cardTitle="Your's JWT Token" />
                    <CardContent>
                        <CardRow>
                              <span style={{ fontFamily: "monospace" }}>
                                <span style={{ color: "#f6513b" }}>{header}</span>.
                                <span style={{ color: "#7122c5" }}>{payload}</span>.
                                <span style={{ color: "#12d622" }}>{signature}</span>
                              </span>
                        </CardRow>
                    </CardContent>
                </CardBody>
                <StyledCustomFooter onClick={handleCopy}>
                    {copied ? <IconCheck /> : <IconContentCopy />}
                </StyledCustomFooter>
            </Card>
        </div>
    );

};
export default JwtToken;