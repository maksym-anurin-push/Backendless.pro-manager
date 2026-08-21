import { k8sAppsV1Api, k8sCoreV1Api } from '../../k8s/k8s'
import { installStatus } from '../install-status'
import { readFileContent } from '../../../utils/fs'
import path from 'path'
import { k8sConfig } from '../../../config/k8s-config'

export async function installBlJsCoderunner({ mountPath, version }) {
    const blK8sConfig = JSON.parse(await readFileContent(path.resolve( __dirname, '../../k8s/config/js-coderunner.json')))
    installStatus.info('installing bl-coderunner-js...')
    const workload = blK8sConfig.workload
    workload.spec.template.spec.containers[0].image=`ghcr.io/maksym-anurin-push/wearepush/backendless/bl-coderunner-js:${version}`

    workload.spec.template.spec.volumes.push({
        hostPath: {
            path: `${mountPath}/repo`,
            type: 'DirectoryOrCreate'
        },
        name: 'repo'
    })

    workload.spec.template.spec.volumes.push({
        hostPath: {
            path: `${mountPath}/logs/bl-coderunner-js/`,
            type: 'DirectoryOrCreate'
        },
        name: 'logs'
    })

    workload.spec.template.spec.volumes.push({
       persistentVolumeClaim: {
            claimName: 'bl-coderunner-js-node-modules'
        },
        name: 'node-modules'
    })

    installStatus.info('creating deployment for bl-coderunner-js')

    await k8sCoreV1Api.createNamespacedPersistentVolumeClaim(await k8sConfig.getNamespace(), {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaim',
        metadata: { name: 'bl-coderunner-js-node-modules' },
        spec: {
            accessModes: ['ReadWriteOnce'],
            storageClassName: 'local-path',
            resources: {
                requests: { storage: '4Gi' }
            }
        }
    })

    return await k8sAppsV1Api.createNamespacedDeployment(await k8sConfig.getNamespace(), workload)
}
