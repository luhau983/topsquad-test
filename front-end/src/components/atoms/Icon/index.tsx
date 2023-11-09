import type { FC, SVGProps } from 'react';

import clsx from 'clsx';

import { useDynamicSvg } from './useDynamicSvg';

export type IconName =
  | 'logo'
  | 'ic_check_filled'
  | 'ic_lock'
  | 'ic_mail'
  | 'img_wolf_login'
  | 'ic_menu'
  | 'ic_notification'
  | 'ic_logo'
  | 'ic_design_light'
  | 'ic_design_dark'
  | 'ic_close_filled'
  | 'ic_home'
  | 'ic_message'
  | 'ic_list'
  | 'ic_edit'
  | 'ic_profile_circle'
  | 'ic_check_all'
  | 'ic_calendar_light'
  | 'ic_note_light'
  | 'ic_vn'
  | 'ic_us'
  | 'ic_de'
  | 'ic_help'
  | 'ic_mail'
  | 'ic_clock'
  | 'ic_wolf'
  | 'ic_timer_light'
  | 'ic_user'
  | 'ic_phone'
  | 'ic_hybrid'
  | 'ic_error'
  | 'ic_badge'
  | 'ic_arrow'
  | 'ic_plus'
  | 'ic_rectange'
  | 'ic_tree'
  | 'ic_briefcase'
  | 'ic_edit_white'
  | 'ic_management_account'
  | 'ic_search'
  | 'ic_filter'
  | 'ic_download'
  | 'ic_upload'
  | 'ic_file'
  | 'ic_group'
  | 'ic_privacy'
  | 'ic_trash'
  | 'ic_login'
  | 'ic_loader'
  | 'ic_alert_circled'
  | 'ic_check_circled'
  | 'ic_zap_light'
  | 'ic_show'
  | 'ic_remove'
  | 'ic_more_horizontal'
  | 'img_congra';

interface IProps {
  iconName: IconName;
  wrapperStyle?: string;
  svgProps?: SVGProps<SVGSVGElement>;
}

const Icon: FC<IProps> = (props: IProps) => {
  const { iconName, wrapperStyle, svgProps } = props;
  const { loading, SvgIcon } = useDynamicSvg(iconName);

  return (
    <>
      {loading && <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>}
      {SvgIcon && <SvgIcon className={clsx('w-6 h-6', wrapperStyle)} {...svgProps} />}
    </>
  );
};

export default Icon;
