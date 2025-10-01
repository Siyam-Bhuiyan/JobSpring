import { TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

const CertificationInput = (props: any) => {
  const [title, setTitle] = useState(props.initialData?.title || "");
  const [issuer, setIssuer] = useState(props.initialData?.issuer || "");
  const [issued, setIssued] = useState<Date | null>();
  const [credentialId, setCredentialId] = useState(
    props.initialData?.credentialId || ""
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">{props.addd?"Add ":"Edit "} Certification</div>

      <TextInput
        label="Certification Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Enter certification name"
        required
      />

      <TextInput
        label="Issuer"
        value={issuer}
        onChange={(e) => setIssuer(e.currentTarget.value)}
        placeholder="Issuing organization"
        required
      />

      <MonthPickerInput
        label="Issue Date"
        placeholder="Pick Date"
        value={issued}
        required
        onChange={(value) => setIssued(value ? new Date(value) : null)}
      />

      <TextInput
        label="Credential ID"
        value={credentialId}
        required
        placeholder="Enter credential ID"
        onChange={(event) => setCredentialId(event.currentTarget.value)}
      />

      <div className="flex gap-4 mt-4">
        <Button color="green" >Save</Button>
        <Button color="red" variant="outline" onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CertificationInput;
