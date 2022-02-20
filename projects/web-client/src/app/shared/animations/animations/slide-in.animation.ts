import { animate, animation, AnimationReferenceMetadata, stagger, style } from "@angular/animations";
import { EASING } from "../animations-constants";

export const direction = {
  fromTop: 'translate(0, -30px)',
  fromRight: 'translate(30px, 0)',
  fromBottom: 'translate(0, 30px)',
  fromLeft: 'translate(-30px, 0)'
}


export type SlideInDirectionType = keyof typeof direction
type SlideInAnimation = (type: SlideInDirectionType, isStagger?: boolean) => AnimationReferenceMetadata

// Params
// Stagger delay param is not supported in useAnimation. Bug report:
// https://github.com/angular/angular/issues/30678
// interval -> 60ms
// animation duration -> 200ms
export const slideInAnimation: SlideInAnimation = (type, isStagger = false) => {
  const initial = style({ 
    opacity: '0', 
    transform: direction[type]
  });

  const final = animate(`{{ duration }} {{delay}} ${EASING.inOut}`, 
    style({ opacity: '1', transform: 'translate(0, 0)'})
  )

  return animation([
    initial,
    isStagger ? stagger('60ms', final) : final
  ])
};

