import { animate, animation, AnimationReferenceMetadata, stagger, style } from "@angular/animations";
import { EASING } from "../animations-constants";

export const direction = {
  toTop: 'translate(0, -30px)',
  toRight: 'translate(30px, 0)',
  toBottom: 'translate(0, 30px)',
  toLeft: 'translate(-30px, 0)'
}


export type SlideOutDirectionType = keyof typeof direction
type SlideOutAnimation = (type: SlideOutDirectionType, isStagger?: boolean) => AnimationReferenceMetadata

// interval -> 60ms
// animation duration -> 200ms
export const slideOutAnimation: SlideOutAnimation = (type, isStagger = false) => {
  const initial = style({ 
    opacity: '1', 
    transform: 'translate(0, 0)'
  });

  const final = animate(`{{ duration }} {{delay}} ${EASING.inOut}`, 
    style({ opacity: '0', transform: direction[type]})
  )

  return animation([
    initial,
    isStagger ? stagger('60ms', final) : final
  ])
};

