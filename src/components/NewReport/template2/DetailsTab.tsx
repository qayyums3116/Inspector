import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format, getYear, getMonth, setYear, setMonth } from "date-fns";
import { CalendarIcon, ArrowRight } from "lucide-react";

// Updated interface with specific types for accessMethods and surfaceConditions
export interface DetailsData2 {
  clientName: string;
  facilitySite: string;
  systemId: string;
  pipeClass: string;
  pIdNo: string;
  inspectedBy: string;
  certNo: string;
  inspectionDate?: Date;
  nextInspectionDate?: Date;
  circuitId: string;
  findings: string;
  accessMethods: string;  // Changed to a single string
  surfaceConditions: string;  // Changed to a single string
  pipeSpecification: string;
  service: string;
  estimatedFootage: string;
  psv: string;
  primaryDiameter: string;
  setPressure: string;
}


interface DetailsTab2Props {
  detailsData: DetailsData2;
  setDetailsData: React.Dispatch<React.SetStateAction<DetailsData2>>;
  navigateToTab: (tab: string) => void;
}

const accessOptions = [
  "Grade",
  "Rope Access",
  "Ladder",
  "Manlift",
  "Scaffold",
  "Under Grating",
  "Harness & Lanyard",
  "Ground Level",
  "Blanket",
];

const surfaceOptions = [
  "Coated",
  "Soil Protective Wrap",
  "Un-Coated",
  "Insulated",
];

const DetailsTab2: React.FC<DetailsTab2Props> = ({
  detailsData,
  setDetailsData,
  navigateToTab,
}) => {
  const updateField = <K extends keyof DetailsData2>(key: K, value: DetailsData2[K]) => {
    setDetailsData(prev => ({ ...prev, [key]: value }));
  };

  // Calendar setup
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM"));

  // Inspection Date
  const [inspCalMonth, setInspCalMonth] = useState<Date>(detailsData.inspectionDate ?? new Date());
  useEffect(() => {
    if (detailsData.inspectionDate) setInspCalMonth(detailsData.inspectionDate);
  }, [detailsData.inspectionDate]);
  const onInspYearChange = (y: number) => setInspCalMonth(setYear(inspCalMonth, y));
  const onInspMonthChange = (m: number) => setInspCalMonth(setMonth(inspCalMonth, m));

  // Next Inspection Date
  const [nextCalMonth, setNextCalMonth] = useState<Date>(detailsData.nextInspectionDate ?? new Date());
  useEffect(() => {
    if (detailsData.nextInspectionDate) setNextCalMonth(detailsData.nextInspectionDate);
  }, [detailsData.nextInspectionDate]);
  const onNextYearChange = (y: number) => setNextCalMonth(setYear(nextCalMonth, y));
  const onNextMonthChange = (m: number) => setNextCalMonth(setMonth(nextCalMonth, m));

  const renderCalendarHeader = (month: Date, onYear: (y: number) => void, onMonth: (m: number) => void) => (
    <div className="flex justify-between items-center mb-2 px-2">
      <select
        value={getYear(month)}
        onChange={e => onYear(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <select
        value={getMonth(month)}
        onChange={e => onMonth(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {months.map((m, idx) => (
          <option key={m} value={idx}>{m}</option>
        ))}
      </select>
    </div>
  );

  // Function to set only one value for accessMethods and surfaceConditions
  const toggleValue = (key: "accessMethods" | "surfaceConditions", val: string) => {
    updateField(key, val);  // Simply update with the selected value
  };

  return (
    <div className="bg-white rounded-b-md p-6 shadow-sm space-y-6">
      {/* Client & Facility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium block mb-1">
            Client Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="clientName"
            value={detailsData.clientName}
            onChange={e => updateField("clientName", e.target.value)}
            placeholder="Enter client name"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Facility / Site <span className="text-red-500">*</span>
          </label>
          <Input
            name="facilitySite"
            value={detailsData.facilitySite}
            onChange={e => updateField("facilitySite", e.target.value)}
            placeholder="Enter facility or site"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            System ID <span className="text-red-500">*</span>
          </label>
          <Input
            name="systemId"
            value={detailsData.systemId}
            onChange={e => updateField("systemId", e.target.value)}
            placeholder="Enter system ID"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Pipe Class <span className="text-red-500">*</span>
          </label>
          <Input
            name="pipeClass"
            value={detailsData.pipeClass}
            onChange={e => updateField("pipeClass", e.target.value)}
            placeholder="Enter pipe class"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            P&ID No <span className="text-red-500">*</span>
          </label>
          <Input
            name="pIdNo"
            value={detailsData.pIdNo}
            onChange={e => updateField("pIdNo", e.target.value)}
            placeholder="Enter P&ID number"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Inspected By <span className="text-red-500">*</span>
          </label>
          <Input
            name="inspectedBy"
            value={detailsData.inspectedBy}
            onChange={e => updateField("inspectedBy", e.target.value)}
            placeholder="Enter inspector name"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Certification No <span className="text-red-500">*</span>
          </label>
          <Input
            name="certNo"
            value={detailsData.certNo}
            onChange={e => updateField("certNo", e.target.value)}
            placeholder="Enter certification number"
            className="w-full"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium block mb-1">
            Inspection Date <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full text-left ${!detailsData.inspectionDate && "text-muted-foreground"}`}
              >
                {detailsData.inspectionDate
                  ? format(detailsData.inspectionDate, "PPP")
                  : "Select date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <div className="p-3">
                {renderCalendarHeader(inspCalMonth, onInspYearChange, onInspMonthChange)}
                <Calendar
                  mode="single"
                  selected={detailsData.inspectionDate}
                  onSelect={d => {
                    updateField("inspectionDate", d);
                    setInspCalMonth(d ?? inspCalMonth);
                  }}
                  month={inspCalMonth}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Next Inspection <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full text-left ${!detailsData.nextInspectionDate && "text-muted-foreground"}`}
              >
                {detailsData.nextInspectionDate
                  ? format(detailsData.nextInspectionDate, "PPP")
                  : "Select date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <div className="p-3">
                {renderCalendarHeader(nextCalMonth, onNextYearChange, onNextMonthChange)}
                <Calendar
                  mode="single"
                  selected={detailsData.nextInspectionDate}
                  onSelect={d => {
                    updateField("nextInspectionDate", d);
                    setNextCalMonth(d ?? nextCalMonth);
                  }}
                  month={nextCalMonth}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
 


      {/* Access Methods */}
      <div>
        <label className="text-sm font-medium block mb-2">
          Access Methods <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {accessOptions.map(opt => (
            <label key={opt} className="flex items-center space-x-2">
              <Checkbox
                checked={detailsData.accessMethods === opt}
                onCheckedChange={() => toggleValue("accessMethods", opt)}
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Surface Conditions */}
      <div>
        <label className="text-sm font-medium block mb-2">
          Surface Conditions <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {surfaceOptions.map(opt => (
            <label key={opt} className="flex items-center space-x-2">
              <Checkbox
                checked={detailsData.surfaceConditions === opt}
                onCheckedChange={() => toggleValue("surfaceConditions", opt)}
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Piping Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium block mb-1">
            Pipe Specification
          </label>
          <Input
            name="pipeSpecification"
            value={detailsData.pipeSpecification}
            onChange={e => updateField("pipeSpecification", e.target.value)}
            placeholder="Enter pipe specification"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Service
          </label>
          <Input
            name="service"
            value={detailsData.service}
            onChange={e => updateField("service", e.target.value)}
            placeholder="Enter service type"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Estimated Footage
          </label>
          <Input
            name="estimatedFootage"
            value={detailsData.estimatedFootage}
            onChange={e => updateField("estimatedFootage", e.target.value)}
            placeholder="Enter estimated footage"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            PSV
          </label>
          <Input
            name="psv"
            value={detailsData.psv}
            onChange={e => updateField("psv", e.target.value)}
            placeholder="Enter PSV"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Primary Diameter
          </label>
          <Input
            name="primaryDiameter"
            value={detailsData.primaryDiameter}
            onChange={e => updateField("primaryDiameter", e.target.value)}
            placeholder="Enter primary diameter"
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">
            Set Pressure
          </label>
          <Input
            name="setPressure"
            value={detailsData.setPressure}
            onChange={e => updateField("setPressure", e.target.value)}
            placeholder="Enter set pressure"
            className="w-full"
          />
        </div>
      </div>
            {/* Summary */}
      <div>
        <label className="text-sm font-medium block mb-1">
          Findings <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={detailsData.findings}
          onChange={e => updateField("findings", e.target.value)}
          placeholder="Enter your Findings"
          className="w-full"
        />
      </div>

      {/* Continue */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="border-inspectoriq-blue text-inspectoriq-blue hover:bg-blue-50"
          onClick={() => {
            console.log("Template 2 DetailsData:", detailsData);
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

export default DetailsTab2;
