import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../../Data/ProfileData";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

const ExperienceInput = (props: any) => {
  const select = fields;
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [desc, setDesc] = useState(props.initialData?.description || "");
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">{props.add?"Add ":"Edit "} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} value={props.initialData?.company} />
        <SelectInput {...select[1]} value={props.initialData?.role} />
      </div>
      <SelectInput {...select[2]} value={props.initialData?.location} />

      <Textarea
        withAsterisk
        label="Summary"
        className="w-full rounded-lg"
        value={desc}
        autosize
        placeholder="Enter Summary..."
        minRows={3}
        onChange={(event) => setDesc(event.currentTarget.value)}
      />
      
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          withAsterisk
          maxDate={endDate || undefined}
          label="Start Date"
          placeholder="Pick Date"
          className="w-full"
          value={startDate}
          onChange={(value) => setStartDate(value ? new Date(value) : null)}
        />
        <MonthPickerInput
          disabled={checked}
          withAsterisk
          minDate={startDate || undefined}
          label="End Date"
          placeholder="Pick Date"
          className="w-full"
          value={endDate}
          onChange={(value) => setEndDate(value ? new Date(value) : null)}
        />
      </div>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)} autoContrast
        label="I currently work here"
        className="mt-2"
      />
      <div className="flex gap-4 mt-4">
        <Button onClick={() => props.setEdit(false)} color="green">Save</Button>
        <Button color="red" variant="outline" onClick={() => props.setEdit(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default ExperienceInput;
