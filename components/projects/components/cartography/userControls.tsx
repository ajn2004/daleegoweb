import { useState } from "react";

let mouse_x: number;
let mouse_y: number;

function objectRotation(event: React.MouseEvent){
    // handles object rotation
    // rotate object by a difference between  mouse drag
    // We want to determine the proper axes of rotation by
  // Cross view with
  const [surfaceMesh, setSurfaceMesh] useState<THREE.InstancedMesh>()
    var angle_step = 0.02;
    var up_rot = new THREE.Quaternion();
    var left_rot = new THREE.Quaternion();
    
    var angle = -(mouse_x - event.clientX)*angle_step;
    up_rot.setFromAxisAngle(camera.up_q, angle/2)
    red_mesh.applyQuaternion(up_rot);
    orange_mesh.applyQuaternion(up_rot);
    dash_x.applyQuaternion(up_rot);
    dash_y.applyQuaternion(up_rot);
    dash_z.applyQuaternion(up_rot);
    
    var angle = -(mouse_y - event.clientY)*angle_step;
    left_rot.setFromAxisAngle(camera.left, angle/2)
    red_mesh.applyQuaternion(left_rot);
    orange_mesh.applyQuaternion(left_rot);
    dash_x.applyQuaternion(left_rot);
    dash_y.applyQuaternion(left_rot);
    dash_z.applyQuaternion(left_rot);
    if(!toggle_scale_movement){
        // in the event toggle_scale_movement is false, cross should rotate w/ scenery
        dash_x.position.applyQuaternion(up_rot);
        dash_x.position.applyQuaternion(left_rot);
        dash_y.position.applyQuaternion(up_rot);
        dash_y.position.applyQuaternion(left_rot);
        dash_z.position.applyQuaternion(up_rot);
        dash_z.position.applyQuaternion(left_rot);
    }
    mouse_x = event.clientX;
    mouse_y = event.clientY;
   
}

function mouseAction(event: React.MouseEvent){
    // Rotational controls
  let mouse_x = event.clientX;
  let mouse_y = event.clientY;
  if (event.button == 2){
    window.addEventListener("mousemove", cameraRotation); 
  } else if (event.button == 0){
    window.addEventListener("mousemove", objectRotation);   
    }
}
