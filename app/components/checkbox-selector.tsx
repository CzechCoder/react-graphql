"use client";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

export const CheckboxSelector = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [reqFields, setReqFields] = useState<{
    name: boolean;
    email: boolean;
    city: boolean;
  }>({
    name: true,
    email: true,
    city: true,
  });

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setReqFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked ? true : false,
    }));
  };

  const trueKeysString = useMemo(
    () =>
      Object.entries(reqFields)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join("/"),
    [reqFields]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", trueKeysString);
    router.push(`${pathname}?${params.toString()}`);
  }, [reqFields]);

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={reqFields.name}
            onChange={handleCheck}
            name="name"
          />
        }
        label="Name"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={reqFields.email}
            onChange={handleCheck}
            name="email"
          />
        }
        label="Email"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={reqFields.city}
            onChange={handleCheck}
            name="city"
          />
        }
        label="City"
      />
    </FormGroup>
  );
};
