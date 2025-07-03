// src/components/NewReport/template3/DetailsTab.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, getYear, getMonth, setYear, setMonth } from "date-fns";
import { CalendarIcon, ArrowRight } from "lucide-react";

export interface DetailsData3 {
  unit: string;
  site: string;
  circuitId: string;
  inspectionDate?: Date;
  service: string;
  lineNumber: string;
  inspector: string;
  spec: string;
  inspectionFinding: string;
}

interface DetailsTab3Props {
  detailsData: DetailsData3;
  setDetailsData: React.Dispatch<React.SetStateAction<DetailsData3>>;
  navigateToTab: (tab: string) => void;
}

const DetailsTab3: React.FC<DetailsTab3Props> = ({
  detailsData,
  setDetailsData,
  navigateToTab,
}) => {
  const updateField = <K extends keyof DetailsData3>(
    key: K,
    value: DetailsData3[K]
  ) => {
    setDetailsData((prev) => ({ ...prev, [key]: value }));
  };

  // calendar header data
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(0, i), "MMMM")
  );

  // inspection date state
  const [inspMonth, setInspMonth] = useState<Date>(
    detailsData.inspectionDate ?? new Date()
  );
  useEffect(() => {
    if (detailsData.inspectionDate) {
      setInspMonth(detailsData.inspectionDate);
    }
  }, [detailsData.inspectionDate]);
  const onInspYearChange = (y: number) =>
    setInspMonth(setYear(inspMonth, y));
  const onInspMonthChange = (m: number) =>
    setInspMonth(setMonth(inspMonth, m));

  const renderCalendarHeader = (
    month: Date,
    onYear: (y: number) => void,
    onMonth: (m: number) => void
  ) => (
    <div className="flex justify-between items-center mb-2 px-2">
      <select
        value={getYear(month)}
        onChange={(e) => onYear(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select
        value={getMonth(month)}
        onChange={(e) => onMonth(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {months.map((m, idx) => (
          <option key={m} value={idx}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-b-md p-6 shadow-sm space-y-6">
      {/* Top row: unit, site, date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium block mb-1">
            UNIT <span className="text-red-500">*</span>
          </label>
          <Input
            value={detailsData.unit}
            onChange={(e) => updateField("unit", e.target.value)}
            placeholder="Enter unit"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            SITE <span className="text-red-500">*</span>
          </label>
          <Input
            value={detailsData.site}
            onChange={(e) => updateField("site", e.target.value)}
            placeholder="Enter site"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Inspection Date <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full text-left ${
                  !detailsData.inspectionDate ? "text-muted-foreground" : ""
                }`}
              >
                {detailsData.inspectionDate
                  ? format(detailsData.inspectionDate, "PPP")
                  : "Select date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 pointer-events-auto">
                {renderCalendarHeader(
                  inspMonth,
                  onInspYearChange,
                  onInspMonthChange
                )}
                <Calendar
                  mode="single"
                  selected={detailsData.inspectionDate}
                  onSelect={(d) => updateField("inspectionDate", d!)}
                  month={inspMonth}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Row: service, line number, inspector, spec */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {([
          ["SERVICE", "service"],
          ["LINE NUMBER", "lineNumber"],
          ["INSPECTOR", "inspector"],
          ["SPEC", "spec"],
        ] as const).map(([label, key]) => (
          <div key={key}>
            <label className="text-sm font-medium block mb-1">
              {label} <span className="text-red-500">*</span>
            </label>
            <Input
              value={detailsData[key]}
              onChange={(e) => updateField(key, e.target.value as any)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
 
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Circuit ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="circuitId"
                    value={detailsData.circuitId}
                    onChange={e => updateField("circuitId", e.target.value)}
                    placeholder="Enter Circuit ID"
                    className="w-full"
                  />
                </div>      

      {/* Findings & Corrective action */}
      <div>
        <label className="text-sm font-medium block mb-1">
          Inspection Finding
        </label>
        <Textarea
          value={detailsData.inspectionFinding}
          onChange={(e) => updateField("inspectionFinding", e.target.value)}
          placeholder="Enter findings"
          className="w-full"
        />
      </div>


      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="border-inspectoriq-blue text-inspectoriq-blue hover:bg-blue-50"
          onClick={() => {
            console.log("Template 3 DetailsData:", detailsData);
            navigateToTab("images");
          }}
        >
          Continue to Images
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DetailsTab3;
