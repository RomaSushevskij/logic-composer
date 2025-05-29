import { filterFieldsMapper } from "../lib/filter-fields-mapper";
import { filterOperatorsMapper } from "../lib/filter-operators-mapper";
import { filterGendersMapper } from "../lib/filter-genders-mapper";
import { filterChannelsMapper } from "../lib/filter-channels-mapper";

type TCombinatorType = "AND" | "OR";
type TFilterField = keyof typeof filterFieldsMapper;
type TFilterOperator = keyof typeof filterOperatorsMapper;
export type TFilterGender = keyof typeof filterGendersMapper;
export type TFilterChannel = keyof typeof filterChannelsMapper;
export type TRuleNodeType = "filter" | "group";

type TRuleFilterValue<F extends TFilterField> = F extends "gender"
  ? TFilterGender
  : F extends "channel"
    ? TFilterChannel
    : string;

export type TRuleFilter<F extends TFilterField = TFilterField> = {
  id: string;
  type: "filter";
  field: F;
  operator: TFilterOperator;
  value: TRuleFilterValue<F>;
};

export type TRuleGroup = {
  id: string;
  title: string;
  type: "group";
  combinator: TCombinatorType;
  children: TRuleNode[];
  disabled: boolean;
  locked: boolean;
  collapsed: boolean;
};

export type TRuleNode = TRuleGroup | TRuleFilter;

// const a: TRuleFilter<"channel"> = { value: "email" };
