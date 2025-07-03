// src/components/NewReport/template1/DetailsTab.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, getYear, getMonth, setYear, setMonth } from "date-fns";
import { CalendarIcon, ArrowRight } from "lucide-react";
import InspectionSelect from "@/components/InspectionSelect";

export interface DetailsData {
  inspectionDate?: Date;
  company: string;
  unit: string;
  location: string;
  circuitId: string;
  lineNumbers: string;
  pipeSpecification: string;
  description: string;
  serviceType: string;
  pipeMaterial: string;
  designCode: string;
  class: string;
  pId: string;
  workOrder: string;
  nextInspectionDate?: Date;
  typeOfInspection: string;
  nextUTInspDate?: Date;
  locationAccess: string;
  route: string;
  insulationStatus: string;
  coatingStatus: string;
  findings: string;
}

interface DetailsTabProps {
  detailsData: DetailsData;
  setDetailsData: React.Dispatch<React.SetStateAction<DetailsData>>;
  navigateToTab: (tab: string) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  detailsData,
  setDetailsData,
  navigateToTab,
}) => {
  const updateField = <K extends keyof DetailsData>(key: K, value: DetailsData[K]) => {
    setDetailsData(prev => ({ ...prev, [key]: value }));
  };

  // Prepare years & months for calendar headers
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM"));

  // === Inspection Date calendar state ===
  const [inspectionCalendarMonth, setInspectionCalendarMonth] = useState<Date>(
    detailsData.inspectionDate ?? new Date()
  );
  useEffect(() => {
    if (detailsData.inspectionDate) {
      setInspectionCalendarMonth(detailsData.inspectionDate);
    }
  }, [detailsData.inspectionDate]);
  const onInspectionYearChange = (year: number) => {
    setInspectionCalendarMonth(setYear(inspectionCalendarMonth, year));
  };
  const onInspectionMonthChange = (monthIndex: number) => {
    setInspectionCalendarMonth(setMonth(inspectionCalendarMonth, monthIndex));
  };

  // === Next Insp Date calendar state ===
  const [nextInspCalendarMonth, setNextInspCalendarMonth] = useState<Date>(
    detailsData.nextInspectionDate ?? new Date()
  );
  useEffect(() => {
    if (detailsData.nextInspectionDate) {
      setNextInspCalendarMonth(detailsData.nextInspectionDate);
    }
  }, [detailsData.nextInspectionDate]);
  const onNextInspYearChange = (year: number) => {
    setNextInspCalendarMonth(setYear(nextInspCalendarMonth, year));
  };
  const onNextInspMonthChange = (monthIndex: number) => {
    setNextInspCalendarMonth(setMonth(nextInspCalendarMonth, monthIndex));
  };

  // === Next UT Insp Date calendar state ===
  const [nextUTInspCalendarMonth, setNextUTInspCalendarMonth] = useState<Date>(
    detailsData.nextUTInspDate ?? new Date()
  );
  useEffect(() => {
    if (detailsData.nextUTInspDate) {
      setNextUTInspCalendarMonth(detailsData.nextUTInspDate);
    }
  }, [detailsData.nextUTInspDate]);
  const onNextUTInspYearChange = (year: number) => {
    setNextUTInspCalendarMonth(setYear(nextUTInspCalendarMonth, year));
  };
  const onNextUTInspMonthChange = (monthIndex: number) => {
    setNextUTInspCalendarMonth(setMonth(nextUTInspCalendarMonth, monthIndex));
  };

  // Shared calendar header renderer
  const renderCalendarHeader = (
    calendarMonth: Date,
    onYearChange: (year: number) => void,
    onMonthChange: (monthIndex: number) => void
  ) => (
    <div className="flex justify-between items-center mb-2 px-2">
      <select
        value={getYear(calendarMonth)}
        onChange={e => onYearChange(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select
        value={getMonth(calendarMonth)}
        onChange={e => onMonthChange(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {months.map((m, idx) => (
          <option key={m} value={idx}>{m}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-b-md p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inspection Date */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Inspection Date <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
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
                  inspectionCalendarMonth,
                  onInspectionYearChange,
                  onInspectionMonthChange
                )}
                <Calendar
                  mode="single"
                  selected={detailsData.inspectionDate}
                  onSelect={date => {
                    updateField("inspectionDate", date);
                    setInspectionCalendarMonth(date ?? inspectionCalendarMonth);
                  }}
                  month={inspectionCalendarMonth}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Company */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Company <span className="text-red-500">*</span>
          </label>
          <Input
            name="company"
            value={detailsData.company}
            onChange={e => updateField("company", e.target.value)}
            placeholder="Enter company name"
            className="w-full"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Unit <span className="text-red-500">*</span>
          </label>
          <Input
            name="unit"
            value={detailsData.unit}
            onChange={e => updateField("unit", e.target.value)}
            placeholder="Enter unit ID"
            className="w-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            name="location"
            value={detailsData.location}
            onChange={e => updateField("location", e.target.value)}
            placeholder="Enter City and State"
            className="w-full"
          />
        </div>

        {/* Circuit ID */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Circuit ID <span className="text-red-500">*</span>
          </label>
          <Input
            name="circuitId"
            value={detailsData.circuitId}
            onChange={e => updateField("circuitId", e.target.value)}
            placeholder="Enter circuit ID"
            className="w-full"
          />
        </div>

        {/* Line Numbers */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Line Numbers
          </label>
          <Textarea
            name="lineNumbers"
            value={detailsData.lineNumbers}
            onChange={e => updateField("lineNumbers", e.target.value)}
            placeholder="Enter line numbers (comma separated)"
            className="w-full"
          />
        </div>

        {/* Pipe Specification */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Pipe Specification <span className="text-red-500">*</span>
          </label>
          <Input
            name="pipeSpecification"
            value={detailsData.pipeSpecification}
            onChange={e => updateField("pipeSpecification", e.target.value)}
            placeholder="Enter pipe specification"
            className="w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <Input
            name="description"
            value={detailsData.description}
            onChange={e => updateField("description", e.target.value)}
            placeholder="Enter description"
            className="w-full"
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Service Type <span className="text-red-500">*</span>
          </label>
          <Input
            name="serviceType"
            value={detailsData.serviceType}
            onChange={e => updateField("serviceType", e.target.value)}
            placeholder="Enter service type"
            className="w-full"
          />
        </div>

        {/* Pipe Material */}
        <div>
          <InspectionSelect
            label="Pipe Material"
            placeholder="Select pipe material"
            options={[
              { value: "carbon_steel", label: "C/S" },
              { value: "stainless_steel", label: "SS" },
              { value: "pvc", label: "PVC" },
              { value: "frp", label: "FRP" },
            ]}
            value={detailsData.pipeMaterial}
            onChange={val => updateField("pipeMaterial", val)}
          />
        </div>

        {/* Design Code */}
        <div>
          <InspectionSelect
            label="Design Code"
            placeholder="Select design code"
            options={[{ value: "ASME B31.3", label: "ASME B31.3" }]}
            value={detailsData.designCode}
            onChange={val => updateField("designCode", val)}
          />
        </div>

        {/* Class */}
        <div>
          <InspectionSelect
            label="Class"
            placeholder="Select class"
            options={[
              { value: "Class 1", label: "Class 1" },
              { value: "Class 2", label: "Class 2" },
              { value: "Class 3", label: "Class 3" },
            ]}
            value={detailsData.class}
            onChange={val => updateField("class", val)}
          />
        </div>

        {/* P&ID Number(s) */}
        <div>
          <label className="text-sm font-medium block mb-1">
            P&ID Number(s)
          </label>
          <Textarea
            name="pId"
            value={detailsData.pId}
            onChange={e => updateField("pId", e.target.value)}
            placeholder="Enter P&ID numbers (comma-separated)"
            className="w-full"
          />
        </div>

        {/* Work Order */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Work Order (Optional)
          </label>
          <Input
            name="workOrder"
            value={detailsData.workOrder}
            onChange={e => updateField("workOrder", e.target.value)}
            placeholder="Enter work order"
            className="w-full"
          />
        </div>

        {/* Next Insp. Date */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Next Insp. Date (Optional)
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !detailsData.nextInspectionDate ? "text-muted-foreground" : ""
                }`}
              >
                {detailsData.nextInspectionDate
                  ? format(detailsData.nextInspectionDate, "PPP")
                  : "Select date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 pointer-events-auto">
                {renderCalendarHeader(
                  nextInspCalendarMonth,
                  onNextInspYearChange,
                  onNextInspMonthChange
                )}
                <Calendar
                  mode="single"
                  selected={detailsData.nextInspectionDate}
                  onSelect={d => {
                    updateField("nextInspectionDate", d);
                    setNextInspCalendarMonth(d ?? nextInspCalendarMonth);
                  }}
                  month={nextInspCalendarMonth}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Next UT Insp. Date */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Next UT Insp. Date (Optional)
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !detailsData.nextUTInspDate ? "text-muted-foreground" : ""
                }`}
              >
                {detailsData.nextUTInspDate
                  ? format(detailsData.nextUTInspDate, "PPP")
                  : "Select date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 pointer-events-auto">
                {renderCalendarHeader(
                  nextUTInspCalendarMonth,
                  onNextUTInspYearChange,
                  onNextUTInspMonthChange
                )}
                <Calendar
                  mode="single"
                  selected={detailsData.nextUTInspDate}
                  onSelect={d => {
                    updateField("nextUTInspDate", d);
                    setNextUTInspCalendarMonth(d ?? nextUTInspCalendarMonth);
                  }}
                  month={nextUTInspCalendarMonth}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Type of Inspection */}
        <div>
          <InspectionSelect
            label="Type of Inspection"
            placeholder="Select type"
            options={[
              { value: "External", label: "External" },
              { value: "UT Survey", label: "UT Survey" },
            ]}
            value={detailsData.typeOfInspection}
            onChange={val => updateField("typeOfInspection", val)}
          />
        </div>

        {/* Location / Access */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Location / Access <span className="text-red-500">*</span>
          </label>
          <Input
            name="locationAccess"
            value={detailsData.locationAccess}
            onChange={e => updateField("locationAccess", e.target.value)}
            placeholder="E.g., Ground level, Scaffolded"
            className="w-full"
          />
        </div>

        {/* Route (From → To) */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1">
            Route (From → To)
          </label>
          <Textarea
            name="route"
            value={detailsData.route}
            onChange={e => updateField("route", e.target.value)}
            placeholder="Describe the piping route"
            className="w-full min-h-[80px]"
          />
        </div>

        {/* Insulation Status */}
        <div>
          <InspectionSelect
            label="Insulation Status"
            placeholder="Select insulation status"
            options={[
              { value: "Insulated", label: "Insulated" },
              { value: "Not Insulated", label: "Not Insulated" },
              { value: "Partial", label: "Partial" },
            ]}
            value={detailsData.insulationStatus}
            onChange={val => updateField("insulationStatus", val)}
          />
        </div>

        {/* Coating Status */}
        <div>
          <InspectionSelect
            label="Coating Status"
            placeholder="Select coating status"
            options={[
              { value: "Coated", label: "Coated" },
              { value: "Uncoated", label: "Uncoated" },
              { value: "Partial", label: "Partial" },
            ]}
            value={detailsData.coatingStatus}
            onChange={val => updateField("coatingStatus", val)}
          />
        </div>

        {/* Findings / Notes */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1">
            Findings / Notes <span className="text-red-500">*</span>
          </label>
          <Textarea
            name="findings"
            value={detailsData.findings}
            onChange={e => updateField("findings", e.target.value)}
            placeholder="Enter your findings and observations"
            className="w-full min-h-[120px]"
          />
        </div>
      </div>

      {/* Navigation Button */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          className="border-inspectoriq-blue text-inspectoriq-blue hover:bg-blue-50"
          onClick={() => navigateToTab("images")}
        >
          Continue to Images
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DetailsTab;
